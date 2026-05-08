// /app/api/reminders/send/route.ts
// Vercel Cron Job endpoint — runs daily
// Configure in vercel.json: "crons": [{ "path": "/api/reminders/send", "schedule": "0 9 * * *" }]

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import type { Database } from "@/types/database";

const REMINDER_INTERVALS = [180, 90, 60, 30, 7] as const;
type ReminderInterval = (typeof REMINDER_INTERVALS)[number];

const REMINDER_MESSAGES: Record<ReminderInterval, { subject: string; headline: string; body: string }> = {
  180: {
    subject: "Your {label} renewal window opens in 180 days — here's your checklist",
    headline: "Start preparing — 180 days until expiry",
    body: "You have 6 months before your {label} expires. This is the ideal time to begin gathering documents, notifying your employer, and planning your renewal timeline.",
  },
  90: {
    subject: "Your {label} renewal window opens in 90 days — here's what to do",
    headline: "Renewal window opens — 90 days remaining",
    body: "With 90 days remaining, your renewal window is now open. Contact your employer or attorney to begin the process immediately. Processing times can take 2-3 months.",
  },
  60: {
    subject: "Action recommended — your {label} expires in 60 days",
    headline: "Action recommended — 60 days until expiry",
    body: "You have 2 months before your {label} expires. If you haven't started the renewal process, begin immediately. Delays can result in gaps in your authorization.",
  },
  30: {
    subject: "[ACTION NEEDED] Your {label} expires in 30 days — start your renewal now",
    headline: "Start your renewal immediately — 30 days left",
    body: "You have only 30 days remaining. If you haven't filed for renewal, do so immediately. Premium processing (if available) may be required to ensure approval before expiry.",
  },
  7: {
    subject: "[CRITICAL] Your {label} expires in 7 days",
    headline: "CRITICAL — 7 days until expiry",
    body: "Your {label} expires in 7 days. If you haven't filed, contact an immigration attorney immediately. Emergency consultation is available through the link below.",
  },
};

function formatEmail(template: string, label: string): string {
  return template.replace(/{label}/g, label);
}

export async function GET(request: Request) {
  // Verify cron secret for security
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const resend = new Resend(process.env.RESEND_API_KEY);

  const today = new Date();
  let totalSent = 0;
  const errors: string[] = [];

  for (const daysBefore of REMINDER_INTERVALS) {
    const targetDate = new Date(today);
    targetDate.setDate(targetDate.getDate() + daysBefore);
    const dateStr = targetDate.toISOString().split("T")[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: documents, error: docsError } = await (supabase as any)
      .from("documents")
      .select("*, profiles!inner(email, full_name, plan, reminder_email)")
      .eq("expiry_date", dateStr)
      .eq("is_active", true) as {
        data: Array<{
          id: string; user_id: string; label: string;
          profiles: { email: string; full_name: string | null; plan: string; reminder_email: boolean };
        }> | null;
        error: { message: string } | null;
      };

    for (const doc of documents || []) {
      const profile = doc.profiles;

      // Check plan restrictions (free plan only gets 30 and 7 day reminders)
      if (profile.plan === "free" && daysBefore !== 30 && daysBefore !== 7) {
        continue;
      }

      if (!profile.reminder_email) continue;

      // Check if reminder already sent
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: existing } = await (supabase as any)
        .from("reminder_logs")
        .select("id")
        .eq("document_id", doc.id)
        .eq("days_before", daysBefore)
        .single() as { data: { id: string } | null; error: unknown };

      if (existing) continue; // Already sent

      // Send email
      const template = REMINDER_MESSAGES[daysBefore];
      const subject = formatEmail(template.subject, doc.label);
      const headline = formatEmail(template.headline, doc.label);
      const body = formatEmail(template.body, doc.label);

      try {
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: "DueVisa <reminders@duevisa.com>",
          to: profile.email,
          subject,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>${subject}</title>
            </head>
            <body style="background:#050E0B;color:#fff;font-family:'Helvetica Neue',sans-serif;margin:0;padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#050E0B;padding:40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#0F2419;border-radius:16px;overflow:hidden;max-width:600px;">
                      <!-- Header -->
                      <tr>
                        <td style="background:#0A5C4A;padding:24px 32px;">
                          <span style="font-size:24px;font-weight:800;color:#fff;">Due<span style="color:#C8F562;">Visa</span></span>
                          <p style="color:rgba(255,255,255,0.6);font-size:11px;margin:4px 0 0;text-transform:uppercase;letter-spacing:2px;">deadline tracker</p>
                        </td>
                      </tr>
                      <!-- Body -->
                      <tr>
                        <td style="padding:32px;">
                          <p style="color:#7A9E8A;font-size:14px;margin:0 0 8px;">Hello${profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""},</p>
                          <h1 style="color:#C8F562;font-size:22px;font-weight:700;margin:0 0 8px;">${headline}</h1>
                          <div style="background:rgba(200,245,98,0.1);border:1px solid rgba(200,245,98,0.2);border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
                            <p style="color:#7A9E8A;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Days until expiry</p>
                            <p style="color:#C8F562;font-size:48px;font-weight:800;margin:0;font-family:monospace;">${daysBefore}</p>
                            <p style="color:#fff;font-size:16px;font-weight:600;margin:8px 0 0;">${doc.label}</p>
                          </div>
                          <p style="color:#7A9E8A;font-size:14px;line-height:1.6;">${body}</p>
                          <div style="margin:24px 0;">
                            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                               style="display:inline-block;background:#C8F562;color:#050E0B;font-weight:700;font-size:14px;padding:14px 28px;border-radius:10px;text-decoration:none;">
                              View Your Dashboard →
                            </a>
                          </div>
                          <p style="color:#7A9E8A;font-size:13px;border-top:1px solid rgba(255,255,255,0.05);padding-top:20px;margin-top:20px;">
                            Need help with this deadline? 
                            <a href="${process.env.NEXT_PUBLIC_APP_URL}/attorneys" style="color:#C8F562;">Find an immigration attorney →</a>
                          </p>
                        </td>
                      </tr>
                      <!-- Footer -->
                      <tr>
                        <td style="background:#050E0B;padding:20px 32px;text-align:center;">
                          <p style="color:rgba(122,158,138,0.5);font-size:11px;margin:0;">
                            DueVisa · duevisa.com · 
                            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings" style="color:rgba(122,158,138,0.5);">Unsubscribe</a>
                          </p>
                          <p style="color:rgba(122,158,138,0.4);font-size:10px;margin:6px 0 0;">
                            DueVisa is not a law firm. This is a reminder service only.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });

        if (emailError) {
          errors.push(`Email error for doc ${doc.id}: ${emailError.message}`);
          continue;
        }

        // Log the sent reminder
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any).from("reminder_logs").insert({
          document_id: doc.id,
          user_id: doc.user_id,
          days_before: daysBefore,
          email_id: emailData?.id,
        });

        totalSent++;
      } catch (err) {
        errors.push(`Unexpected error for doc ${doc.id}: ${String(err)}`);
      }
    }
  }

  return NextResponse.json({
    success: true,
    sent: totalSent,
    errors: errors.length > 0 ? errors : undefined,
    timestamp: new Date().toISOString(),
  });
}
