import type { NextConfig } from "next";

// EmailJS IDs are public by design (they're used from the browser). Accept them
// with or without the NEXT_PUBLIC_ prefix so either naming works on Vercel.
const emailjs = (name: string) => process.env[`EMAILJS_${name}`] || process.env[`NEXT_PUBLIC_EMAILJS_${name}`] || "";

const nextConfig: NextConfig = {
  env: {
    EMAILJS_SERVICE_ID: emailjs("SERVICE_ID"),
    EMAILJS_TEMPLATE_ID: emailjs("TEMPLATE_ID"),
    EMAILJS_PUBLIC_KEY: emailjs("PUBLIC_KEY"),
  },
};

export default nextConfig;
