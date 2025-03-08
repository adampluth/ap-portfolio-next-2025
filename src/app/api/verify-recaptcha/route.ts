import { NextResponse } from "next/server";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!; // Keep this SECRET in .env.local

export async function POST(req: Request) {
  try {
    const { token, formData } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "Missing reCAPTCHA token" }, { status: 400 });
    }

    // Verify reCAPTCHA token with Google
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;

    const recaptchaResponse = await fetch(verificationURL, { method: "POST" });
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json({ success: false, message: "Invalid reCAPTCHA token" }, { status: 400 });
    }

    // If reCAPTCHA is valid, forward the form data to Formspree
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrbpzanq";

    const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        "g-recaptcha-response": token, // Attach verified token
      }),
    });

    if (!formspreeResponse.ok) {
      return NextResponse.json({ success: false, message: "Form submission failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
