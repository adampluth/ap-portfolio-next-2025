import { NextResponse } from "next/server";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrbpzanq";

export async function POST(req: Request) {
  try {
    const { token, formData } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "Missing reCAPTCHA token" }, { status: 400 });
    }

    // Verify reCAPTCHA token with Google
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify";
    
    const params = new URLSearchParams();
    params.append("secret", RECAPTCHA_SECRET_KEY);
    params.append("response", token);

    const recaptchaResponse = await fetch(verificationURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const recaptchaData = await recaptchaResponse.json();
    console.log("reCAPTCHA Response:", recaptchaData); // Debugging

    if (!recaptchaData.success) {
      return NextResponse.json(
        { success: false, message: "Invalid reCAPTCHA token", details: recaptchaData },
        { status: 400 }
      );
    }

    // Check score
    if (recaptchaData.score !== undefined && recaptchaData.score < 0.5) {
      return NextResponse.json(
        { success: false, message: "reCAPTCHA score too low, request flagged as suspicious" },
        { status: 400 }
      );
    }

    // Forward the form data to Formspree
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
