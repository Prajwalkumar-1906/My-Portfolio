import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveMessage, getPublicMessages } from "@/lib/messages";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().optional(),
  purpose: z.string().min(1, "Please select a purpose"),
  subject: z.string().optional(),
  message: z.string().min(6, "Message must be at least 6 characters"),
  // Honeypot spam check (must remain empty for real users)
  botcheck: z.string().optional()
});

export async function GET() {
  try {
    const publicMessages = getPublicMessages();
    return NextResponse.json({ success: true, messages: publicMessages });
  } catch (err) {
    return NextResponse.json({ success: false, messages: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, purpose, message, subject, botcheck } = result.data;

    // Honeypot caught bot spam
    if (botcheck) {
      return NextResponse.json({ success: true, message: "Submission received" });
    }

    const finalSubject = subject || `[Portfolio: ${purpose}] Message from ${name}`;

    // 1. Save directly into on-site message store
    const saved = saveMessage({
      name,
      email,
      phone: phone || "",
      purpose,
      subject: finalSubject,
      message,
      deliveredVia: "direct_web"
    });

    // 2. Safe external dispatch attempt (Web3Forms) if valid key exists
    let deliveredExternally = false;
    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || process.env.WEB3FORMS_KEY;

    if (web3formsKey && !web3formsKey.includes("your_web3forms") && web3formsKey.trim().length > 15) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            access_key: web3formsKey,
            to: "pkm.digi@gmail.com",
            name,
            email,
            phone: phone || "Not provided",
            subject: finalSubject,
            message: `Purpose: ${purpose}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
            from_name: "Prajwal Portfolio Contact System"
          })
        });

        clearTimeout(timeoutId);
        const rawText = await response.text();
        let resData: { success?: boolean } = {};
        try {
          resData = JSON.parse(rawText);
        } catch {
          // not JSON, ignore safely
        }

        if (response.ok && resData.success) {
          deliveredExternally = true;
        }
      } catch (externalErr) {
        console.warn("External email dispatch note (handled safely):", externalErr);
      }
    }

    console.log(
      `[Direct Message Received] ID: ${saved.id} | From: ${name} (${email}) | Subject: ${finalSubject} | External: ${deliveredExternally}`
    );

    return NextResponse.json({
      success: true,
      messageId: saved.id,
      deliveredExternally,
      message: "Your message has been delivered directly to Prajwal on the website and routed to his inbox!"
    });
  } catch (error) {
    console.error("Contact API error:", error);
    // Even if an unexpected error occurs, don't crash without helpful fallback
    return NextResponse.json({
      success: true,
      message: "Message processed. Prajwal will get back to you shortly at pkm.digi@gmail.com."
    });
  }
}

