"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });

  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error"; 
    message: string;
  } | null>(null);

  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

  // Ensure reCAPTCHA script is loaded before executing it
  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            setRecaptchaReady(true);
          });
          clearInterval(interval);
        }
      }, 500); // Check every 500ms
  
      return () => clearInterval(interval);
    }
  }, []);  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaReady) {
      setToastMessage({
        type: "error",
        message: "reCAPTCHA not ready. Try again.",
      });
      return;
    }

    try {
      // Ensure reCAPTCHA is available before executing
      if (!window.grecaptcha) {
        throw new Error("reCAPTCHA is not available. Please refresh the page.");
      }

      const token = await window.grecaptcha?.execute(RECAPTCHA_SITE_KEY, {
        action: "submit",
      });

      if (!token) {
        throw new Error("Failed to generate reCAPTCHA token.");
      }

      // Send form data + reCAPTCHA token to Next.js API route
      const response = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, formData }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setToastMessage({ type: "error", message: "reCAPTCHA verification failed." });
        return;
      }

      setToastMessage({ type: "success", message: "Your message has been sent!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      setToastMessage({ type: "error", message: "Something went wrong." });
    }

    setTimeout(() => setToastMessage(null), 10000);
  };

  return (
    <div 
      className="
        min-h-screen 
        flex 
        flex-col 
        items-center 
        justify-center 
        px-6 
        md:px-12 
        text-center 
        relative
      "
    >
      {/* Inject reCAPTCHA script */}
      <script 
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`} 
        async 
        defer
      ></script>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-16"
          >
            <div
              className="
                alert 
                glass 
                shadow-md 
                px-6 
                py-3 
                text-lg 
                font-medium 
                rounded-lg 
                text-white 
                text-shadow 
                backdrop-blur-md 
                bg-opacity-80 
                border 
                border-white/20
              "
              style={{
                backgroundColor: toastMessage?.type === "success" ? "#22C55E" : "#EF4444",
              }}
            >
              <span>{toastMessage?.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          scale: { duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        }}
        className="
          relative 
          text-5xl 
          mt-6 
          font-extrabold 
          text-center
        "
      >
        <span 
          className="
            absolute 
            -inset-4 
            scale-125 
            blur-3xl 
            opacity-50 
            bg-gradient-to-r 
            from-purple-500 
            via-pink-500 
            to-cyan-400
          " 
        />
        <span 
          className="
            relative 
            bg-gradient-to-r 
            from-purple-400 
            via-pink-200 
            to-cyan-200 
            bg-clip-text 
            text-transparent 
            drop-shadow-[0_0_25px_rgba(255,105,180,0.7)]
          "
        >
          Contact Me
        </span>
      </motion.h1>

      {/* Blurb */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="
          mt-4 
          max-w-2xl 
          text-lg 
          md:text-xl 
          text-gray-300 
          leading-relaxed
        "
      >
        {"Let's"} collaborate! Whether you have a project in mind, 
        want to discuss anything, or just say hi—reach out.
      </motion.p>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="
          mt-8 
          max-w-lg 
          w-full 
          bg-gray-900/40 
          p-6 
          rounded-lg 
          shadow-lg 
          backdrop-blur-md 
          space-y-4 
          border 
          border-cyan-500/30
        "
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="
            input 
            input-bordered 
            w-full 
            bg-gray-800/80 
            text-white 
            placeholder-gray-400 
            focus:ring-2 
            focus:ring-cyan-500 
            focus:outline-none 
            rounded-lg 
            shadow-lg
          "
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="
            input 
            input-bordered 
            w-full 
            bg-gray-800/80 
            text-white 
            placeholder-gray-400 
            focus:ring-2 
            focus:ring-cyan-500 
            focus:outline-none 
            rounded-lg 
            shadow-lg
          "
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          className="
            textarea 
            textarea-bordered 
            w-full 
            bg-gray-800/80 
            text-white 
            placeholder-gray-400 
            focus:ring-2 
            focus:ring-cyan-500 
            focus:outline-none 
            rounded-lg 
            shadow-lg
          "
          value={formData.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="
            px-6 
            py-3 
            text-lg 
            font-medium 
            btn 
            btn-md 
            glass 
            !shadow-lg 
            text-white 
            bg-teal-700/60 
            rounded-lg 
            transition 
            hover:bg-teal-600/80
          "
        >
          Send Message
        </button>
      </motion.form>
    </div>
  );
}
