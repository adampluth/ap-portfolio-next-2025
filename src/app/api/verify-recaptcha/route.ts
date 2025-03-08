import { NextResponse } from "next/server";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrbpzanq";

export async function POST(req: Request) {
  try {
    console.log("📌 Received request to /api/verify-recaptcha");

    const { token, formData } = await req.json();
    console.log("📌 Parsed request body:", { token, formData });

    if (!token) {
      console.error("❌ Missing reCAPTCHA token.");
      return NextResponse.json({ success: false, message: "Missing reCAPTCHA token" }, { status: 400 });
    }

    if (!RECAPTCHA_SECRET_KEY) {
      console.error("❌ RECAPTCHA_SECRET_KEY is missing in environment variables.");
      return NextResponse.json({ success: false, message: "Server misconfiguration" }, { status: 500 });
    }

    // Verify reCAPTCHA token with Google
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify";
    const params = new URLSearchParams();
    params.append("secret", RECAPTCHA_SECRET_KEY);
    params.append("response", token);

    console.log("📌 Sending verification request to Google...");
    const recaptchaResponse = await fetch(verificationURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const recaptchaData = await recaptchaResponse.json();
    console.log("🔍 reCAPTCHA Response:", recaptchaData);

    if (!recaptchaData.success) {
      console.error("❌ reCAPTCHA verification failed:", recaptchaData);
      return NextResponse.json(
        { success: false, message: "Invalid reCAPTCHA token", details: recaptchaData },
        { status: 400 }
      );
    }

    if (recaptchaData.score !== undefined && recaptchaData.score < 0.5) {
      console.warn("⚠️ reCAPTCHA score too low, request flagged as suspicious:", recaptchaData.score);
      return NextResponse.json(
        { success: false, message: "reCAPTCHA score too low, request flagged as suspicious" },
        { status: 400 }
      );
    }

    console.log("📌 Sending form data to Formspree...");
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
      console.error("❌ Formspree API error:", await formspreeResponse.text());
      return NextResponse.json({ success: false, message: "Form submission failed" }, { status: 500 });
    }

    console.log("✅ Form submitted successfully!");
    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ success: false, message: "Server error", error: error.toString() }, { status: 500 });
  }
}
