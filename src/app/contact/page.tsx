"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ReCaptchaProvider, useReCaptcha } from "next-recaptcha-v3";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  // reCAPTCHA Token Handling
  const { executeRecaptcha } = useReCaptcha();

  useEffect(() => {
    if (!executeRecaptcha) return;
  
    executeRecaptcha("contact_form").then((token: string) => {
      setRecaptchaToken(token);
      console.log("reCAPTCHA Token:", token);
    });
  }, [executeRecaptcha]);

  // Handle Form Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      alert("reCAPTCHA verification failed. Please try again.");
      return;
    }

    alert("Message sent! (Replace this with an API call)");
  };

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center relative">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="fixed inset-0 bg-radial-gradient mix-blend-overlay opacity-50" />
        </div>

        {showContent && (
          <>
            {/* Animated Header */}
            <motion.h1
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
              initial="initial"
              animate="animate"
              whileInView={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                scale: {
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              className="relative text-5xl mt-6 font-extrabold text-center"
            >
              {/* Diffused Glow */}
              <span className="absolute -inset-4 scale-125 blur-3xl opacity-50 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400" />
              {/* Main Gradient Text */}
              <span className="relative bg-gradient-to-r from-purple-400 via-pink-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,105,180,0.7)]">
                Contact Me
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="mt-4 max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              {"Let's"} collaborate! Whether you have a project in mind, want to discuss UI/UX, or just say hi—reach out.
            </motion.p>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="mt-8 max-w-lg w-full bg-gray-900/40 p-6 rounded-lg shadow-lg backdrop-blur-md space-y-4 border border-cyan-500/30"
            >
              {/* Input Fields */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full bg-gray-800/80 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none rounded-lg shadow-lg"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered w-full bg-gray-800/80 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none rounded-lg shadow-lg"
                value={formData.email}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full bg-gray-800/80 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none rounded-lg shadow-lg"
                value={formData.message}
                onChange={handleChange}
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="px-6 py-3 text-lg font-medium btn btn-md glass !shadow-lg text-white bg-teal-700/60 rounded-lg transition hover:bg-teal-600/80 disabled:bg-teal-700/30 disabled:text-gray-400"
                disabled={!recaptchaToken}
              >
                Send Message
              </button>
            </motion.form>
          </>
        )}
      </div>
    </ReCaptchaProvider>
  );
}
