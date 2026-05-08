// /app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        const plan = session.metadata?.plan;

        if (userId && plan) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any).from("profiles").update({
            plan: plan as "free" | "pro" | "team",
            stripe_subscription_id: session.subscription as string,
          }).eq("id", userId);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by customer ID
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: profile } = await (supabase as any)
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single() as { data: { id: string } | null };

        if (profile) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any).from("profiles").update({
            plan: "free",
            stripe_subscription_id: null,
          }).eq("id", profile.id);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        if (subscription.status === "active") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: profile } = await (supabase as any)
            .from("profiles")
            .select("id")
            .eq("stripe_customer_id", customerId)
            .single() as { data: { id: string } | null };

          if (profile) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase as any).from("profiles").update({
              stripe_subscription_id: subscription.id,
            }).eq("id", profile.id);
          }
        }
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
