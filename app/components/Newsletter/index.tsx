"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

type SubscriptionState = "idle" | "loading" | "success" | "error";

interface NewsletterProps {
  variant?: "default" | "compact";
}

export function Newsletter({ variant = "default" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubscriptionState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setState("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setState("error");
        setMessage(data.message);
      }
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (state === "success") {
    return (
      <div className={`${variant === "compact" ? "py-6" : "py-12"}`}>
        <div className="flex items-center justify-center gap-3 text-emerald-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-lg font-medium">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="py-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={state === "loading"}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={state === "loading"}
            className="px-6 py-2.5 bg-zinc-100 text-zinc-900 font-medium rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {state === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {state === "error" && (
          <p className="mt-2 text-sm text-red-400">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="relative py-16 px-6">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 via-zinc-800/30 to-zinc-900/50 rounded-2xl" />
      <div className="relative max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-zinc-800">
          <Mail className="w-6 h-6 text-zinc-300" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-100 font-display sm:text-3xl">
          Stay in the loop
        </h3>
        <p className="mt-3 text-zinc-400 max-w-md mx-auto">
          Get notified when I publish new articles about AI, distributed systems and software engineering.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={state === "loading"}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={state === "loading"}
            className="px-8 py-3 bg-zinc-100 text-zinc-900 font-semibold rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Subscribing...
              </span>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
        {state === "error" && (
          <p className="mt-4 text-sm text-red-400">{message}</p>
        )}
        <p className="mt-4 text-xs text-zinc-500">
          No spam, unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

