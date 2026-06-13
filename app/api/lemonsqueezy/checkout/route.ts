import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

const VARIANT_IDS: Record<string, Record<string, string>> = {
  pro: {
    monthly: process.env.LEMONSQUEEZY_PRO_MONTHLY_VARIANT_ID || "",
    yearly:  process.env.LEMONSQUEEZY_PRO_YEARLY_VARIANT_ID  || "",
  },
  team: {
    monthly: process.env.LEMONSQUEEZY_TEAM_MONTHLY_VARIANT_ID || "",
  },
};

export async function POST(request: Request) {
  if (!process.env.LEMONSQUEEZY_API_KEY) {
    return NextResponse.json({ error: "Payments not configured." }, { status: 503 });
  }

  lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY });

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as { plan: string; billing?: string };
  const { plan, billing = "monthly" } = body;

  const variantId = VARIANT_IDS[plan]?.[billing];
  if (!variantId) {
    return NextResponse.json({ error: "Invalid plan or billing period." }, { status: 400 });
  }

  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  if (!storeId) {
    return NextResponse.json({ error: "Store not configured." }, { status: 503 });
  }

  try {
    const { data, error } = await createCheckout(storeId, variantId, {
      checkoutData: {
        email: user.email ?? undefined,
        custom: { user_id: user.id },
      },
      checkoutOptions: {
        embed: false,
        media: false,
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
        receiptButtonText: "Go to Dashboard",
        receiptThankYouNote: "Thank you for upgrading to DueVisa Pro! Your reminders are now active.",
      },
    });

    if (error || !data?.data?.attributes?.url) {
      return NextResponse.json({ error: "Failed to create checkout." }, { status: 500 });
    }

    return NextResponse.json({ url: data.data.attributes.url });
  } catch (err) {
    console.error("LemonSqueezy checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout." }, { status: 500 });
  }
}
