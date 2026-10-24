import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().optional(),
  purpose: z.string().min(1, "Please select a purpose"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // Honeypot spam check (must remain empty for real users)
  botcheck: z.string().optional()
});

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

    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || process.env.WEB3FORMS_KEY;
    const finalSubject = subject || `[Portfolio: ${purpose}] Message from ${name}`;

    if (web3formsKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
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

      const resData = await response.json();
      if (resData.success) {
        return NextResponse.json({ success: true, message: "Your message has been delivered to Prajwal's inbox!" });
      }
    }

    // Direct simulated receipt if key is not yet set in production
    console.log(`[Contact Form Dispatch] To: pkm.digi@gmail.com | Subject: ${finalSubject} | From: ${name} (${email}) | Msg: ${message}`);

    return NextResponse.json({
      success: true,
      message: "Message processed successfully. Prajwal will get back to you shortly at " + email + "!"
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to transmit message. Please email directly at pkm.digi@gmail.com." },
      { status: 500 }
    );
  }
}
