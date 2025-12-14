import type { NextApiRequest, NextApiResponse } from "next";

type SuccessResponse = {
  success: true;
  message: string;
};

type ErrorResponse = {
  success: false;
  message: string;
};

type ResponseData = SuccessResponse | ErrorResponse;

function parseButtondownTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  const apiToken = process.env.BUTTONDOWN_API_KEY;

  if (!apiToken) {
    console.error("BUTTONDOWN_API_KEY is not configured");
    return res.status(500).json({
      success: false,
      message: "Newsletter service not configured (missing BUTTONDOWN_API_KEY)",
    });
  }

  try {
    const tags = parseButtondownTags(process.env.BUTTONDOWN_TAGS);
    const response = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        ...(tags.length ? { tags } : {}),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Buttondown API error:", errorData);

      // Handle duplicate email gracefully
      // Buttondown returns a 400 if the subscriber already exists.
      // (Exact shape may vary; we keep this permissive to avoid breaking UX.)
      const message =
        typeof errorData?.detail === "string"
          ? errorData.detail
          : typeof errorData?.message === "string"
            ? errorData.message
            : "";
      if (response.status === 400 && message.toLowerCase().includes("already")) {
        return res.status(200).json({
          success: true,
          message: "You're already subscribed! Thanks for your interest.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to subscribe. Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thanks for subscribing! Please check your inbox.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
