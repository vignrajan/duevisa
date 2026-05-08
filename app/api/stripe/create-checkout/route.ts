// /app/api/stripe/create-checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const PRICE_IDS: Record<string, { monthly: string; yearly?: string }> = {
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || "price_pro_monthly",
    yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID || "price_pro_yearly",
  },
  team: {
    monthly: process.env.STRIPE_TEAM_MONTHLY_PRICE_ID || "price_team_monthly",
  },
};

export async function POST(request: Request) {
  try {
    // Guard: prevent crash if Stripe keys are not configured
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      return NextResponse.json(
        { error: "Payments are not configured yet. Please set up your Stripe keys." },
        { status: 503 }
      );
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json() as { plan: string; billing?: string };
    const { plan, billing = "monthly" } = body;

    if (!PRICE_IDS[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Get or create Stripe customer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase as any)
      .from("profiles")
      .select("stripe_customer_id, email")
      .eq("id", user.id)
      .single() as { data: { stripe_customer_id: string | null; email: string } | null };

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const priceId = billing === "yearly" && PRICE_IDS[plan].yearly
      ? PRICE_IDS[plan].yearly!
      : PRICE_IDS[plan].monthly;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        supabase_user_id: user.id,
        plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
