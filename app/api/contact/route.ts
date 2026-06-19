import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Forward the request to your n8n server from the Next.js Backend
    // This bypasses browser CORS and Mixed Content (HTTPS -> HTTP) blocks
    const response = await fetch("http://hackarena-n8n.koreacentral.cloudapp.azure.com:5678/webhook/demo-webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`n8n responded with status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error forwarding to n8n:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send data" },
      { status: 500 }
    );
  }
}
