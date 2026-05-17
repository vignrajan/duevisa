import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { email, plan } = await request.json() as { email: string; plan: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("waitlist")
      .upsert({ email: email.toLowerCase().trim(), plan }, { onConflict: "email" });

    if (error) {
      console.error("Waitlist insert error:", JSON.stringify(error));
      return NextResponse.json({ error: error.message || "Failed to join waitlist" }, { status: 500 });
    }

    // Send confirmation email — non-blocking, don't fail the request if this errors
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "DueVisa <hello@duevisa.com>",
        to: email,
        subject: "You're on the DueVisa Pro waitlist 🎉",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:560px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#050E0B;padding:32px 40px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#0a5c4a;border-radius:10px;width:36px;height:36px;text-align:center;vertical-align:middle;">
                <span style="color:#C8F562;font-size:18px;font-weight:bold;line-height:36px;">≡</span>
              </td>
              <td style="padding-left:10px;">
                <span style="color:#eef5f0;font-size:18px;font-weight:700;">Due<span style="color:#C8F562;">Visa</span></span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px;">
          <h1 style="margin:0 0 12px;font-size:24px;font-weight:800;color:#050E0B;line-height:1.2;">
            You&rsquo;re on the list. 🎉
          </h1>
          <p style="margin:0 0 20px;font-size:15px;color:#4a5568;line-height:1.6;">
            Thanks for joining the DueVisa Pro waitlist. You&rsquo;ll be among the first to know when Pro launches — and we&rsquo;ll make sure early waitlist members get a special deal.
          </p>
          <p style="margin:0 0 32px;font-size:15px;color:#4a5568;line-height:1.6;">
            In the meantime, the free plan is fully live. You can start tracking up to 3 immigration documents right now — no credit card required.
          </p>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:#0a5c4a;border-radius:10px;">
              <a href="https://duevisa.com/signup" style="display:inline-block;padding:14px 28px;color:#C8F562;font-size:14px;font-weight:700;text-decoration:none;">
                Start free — track your first document →
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px;border-top:1px solid #f0f0f0;">
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
            DueVisa · Not a law firm · Deadline tracking only<br>
            You&rsquo;re receiving this because you joined the Pro waitlist at duevisa.com.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });
    } catch (emailErr) {
      console.error("Waitlist confirmation email failed:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Server error";
    console.error("Waitlist error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
