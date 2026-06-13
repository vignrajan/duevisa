import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// LemonSqueezy sends webhooks with X-Signature header (HMAC-SHA256)
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-signature") ?? "";

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 500 });
  }

  if (!verifySignature(body, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const eventName = event.meta && typeof event.meta === "object"
    ? (event.meta as Record<string, unknown>).event_name as string
    : null;

  const data = event.data as Record<string, unknown> | undefined;
  const attrs = data?.attributes as Record<string, unknown> | undefined;
  const meta = event.meta as Record<string, unknown> | undefined;
  const customData = meta?.custom_data as Record<string, unknown> | undefined;

  const userId = customData?.user_id as string | undefined;
  const customerId = String(attrs?.customer_id ?? "");
  const subscriptionId = String(data?.id ?? "");

  try {
    switch (eventName) {
      case "subscription_created":
      case "order_created": {
        if (!userId) break;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any).from("profiles").update({
          plan: "pro",
          stripe_customer_id: customerId,   // reusing column for LS customer ID
          stripe_subscription_id: subscriptionId,
        }).eq("id", userId);
        break;
      }

      case "subscription_cancelled":
      case "subscription_expired": {
        if (customerId) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any).from("profiles").update({
            plan: "free",
            stripe_subscription_id: null,
          }).eq("stripe_customer_id", customerId);
        }
        break;
      }

      case "subscription_resumed":
      case "subscription_updated": {
        const status = attrs?.status as string | undefined;
        if (customerId && status === "active") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any).from("profiles").update({
            plan: "pro",
            stripe_subscription_id: subscriptionId,
          }).eq("stripe_customer_id", customerId);
        }
        break;
      }
    }
  } catch (err) {
    console.error("LemonSqueezy webhook handler error:", err);
    return NextResponse.json({ error: "Handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
