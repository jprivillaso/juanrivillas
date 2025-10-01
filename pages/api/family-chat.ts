import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

interface ChatRequest {
  question: string;
}

export default async function familyChat(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed. Use POST", { status: 405 });
  }

  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("Content-Type must be application/json", { status: 400 });
  }

  try {
    const body: ChatRequest = await req.json();

    if (!body.question || typeof body.question !== "string") {
      return new NextResponse("Question is required and must be a string", { status: 400 });
    }

    // Server-side environment variables (secure)
    const apiUrl = process.env.API_URL || "http://localhost:4000/api";
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;

    // Debug logging (safe for production)
    console.log("Chat API Environment check:", {
      hasApiUrl: !!apiUrl,
      hasUsername: !!username,
      hasPassword: !!password,
      apiUrl: apiUrl,
    });

    if (!username || !password) {
      console.error("Missing API credentials - username:", !!username, "password:", !!password);
      return new NextResponse(
        `Server configuration error: Missing ${!username ? "username" : "password"}`,
        { status: 500 },
      );
    }

    // Make the request to your family tree API with server-side credentials
    const response = await fetch(`${apiUrl}/family_members/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
      body: JSON.stringify({ question: body.question }),
      signal: AbortSignal.timeout(30000), // 30 seconds for Fly.io cold starts
    });

    if (!response.ok) {
      console.error(`Family API error: ${response.status} ${response.statusText}`);
      return new NextResponse("Failed to get answer from family API", { status: 502 });
    }

    const data = await response.json();

    // Return the response to the client
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in family chat API:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : "No stack trace",
    });

    if (error instanceof Error && error.name === "AbortError") {
      return new NextResponse(
        "Request timeout - The AI service may be starting up. Please try again in a few seconds.",
        { status: 408 },
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`Internal server error: ${errorMessage}`, { status: 500 });
  }
}
