import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function familyMembers(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed. Use GET", { status: 405 });
  }

  try {
    // Server-side environment variables (secure)
    const apiUrl = process.env.API_URL || "http://localhost:4000/api";
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;

    if (!username || !password) {
      console.error("Missing API credentials - username:", !!username, "password:", !!password);
      return new NextResponse(
        `Server configuration error: Missing ${!username ? "username" : "password"}`,
        { status: 500 },
      );
    }

    // Make the request to your family tree API with server-side credentials
    const response = await fetch(`${apiUrl}/family_members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Authentication failed with family API");
        return new NextResponse("Authentication failed", { status: 401 });
      } else if (response.status === 404) {
        console.error("Family members endpoint not found");
        return new NextResponse("Family members API endpoint not found", { status: 404 });
      } else {
        console.error(`Family API error: ${response.status} ${response.statusText}`);
        return new NextResponse("Failed to fetch family members", { status: 502 });
      }
    }

    const data = await response.json();

    if (!data || !data.data || !Array.isArray(data.data.family_members)) {
      console.error("Invalid response format from family API");
      return new NextResponse("Invalid response format from family API", { status: 502 });
    }

    // Return the response to the client
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in family members API:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : "No stack trace",
    });

    if (error instanceof Error && error.name === "AbortError") {
      return new NextResponse("Request timeout - The API service may be starting up. Please try again in a few seconds.", { status: 408 });
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`Internal server error: ${errorMessage}`, { status: 500 });
  }
}
