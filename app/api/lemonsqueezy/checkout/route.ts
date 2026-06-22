import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

export async function POST(request: Request) {
  // Validate all required env vars upfront with specific messages
  if (!process.env.LEMONSQUEEZY_API_KEY) {
    console.error("Missing: LEMONSQUEEZY_API_KEY");
    return NextResponse.json({ error: "LEMONSQUEEZY_API_KEY not set in Vercel env vars." }, { status: 503 });
  }
  if (!process.env.LEMONSQUEEZY_STORE_ID) {
    console.error("Missing: LEMONSQUEEZY_STORE_ID");
    return NextResponse.json({ error: "LEMONSQUEEZY_STORE_ID not set in Vercel env vars." }, { status: 503 });
  }

  lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY });

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as { plan: string; billing?: string };
  const { plan, billing = "monthly" } = body;

  const VARIANT_IDS: Record<string, Record<string, string | undefined>> = {
    pro: {
      monthly: process.env.LEMONSQUEEZY_PRO_MONTHLY_VARIANT_ID,
      yearly:  process.env.LEMONSQUEEZY_PRO_YEARLY_VARIANT_ID,
    },
    team: {
      monthly: process.env.LEMONSQUEEZY_TEAM_MONTHLY_VARIANT_ID,
    },
  };

  const variantId = VARIANT_IDS[plan]?.[billing];
  if (!variantId) {
    console.error(`Missing variant ID for plan=${plan} billing=${billing}`);
    return NextResponse.json({ error: `Variant ID not configured for ${plan}/${billing}.` }, { status: 503 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://duevisa.com";

  try {
    const { data, error } = await createCheckout(process.env.LEMONSQUEEZY_STORE_ID, variantId, {
      checkoutData: {
        email: user.email ?? undefined,
        custom: { user_id: user.id },
      },
      checkoutOptions: {
        embed: false,
        media: false,
      },
      productOptions: {
        redirectUrl: `${appUrl}/dashboard?upgraded=true`,
        receiptButtonText: "Go to Dashboard",
        receiptThankYouNote: "Thank you for upgrading to DueVisa Pro! Your reminders are now active.",
      },
    });

    if (error) {
      console.error("LemonSqueezy API error:", JSON.stringify(error));
      return NextResponse.json({ error: `LemonSqueezy error: ${JSON.stringify(error)}` }, { status: 500 });
    }

    const url = data?.data?.attributes?.url;
    if (!url) {
      console.error("No checkout URL in response:", JSON.stringify(data));
      return NextResponse.json({ error: "No checkout URL returned." }, { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error("LemonSqueezy checkout exception:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
