import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Please provide your contact details." },
      { status: 400 },
    );
  }
  const { name, email, message } = body as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.length > 120 ||
    typeof email !== "string" ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" ||
    !message.trim() ||
    message.length > 5500
  ) {
    return NextResponse.json(
      { error: "Please check your name, email, and project details." },
      { status: 400 },
    );
  }
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "Inquiries are temporarily unavailable." },
      { status: 503 },
    );
  }
  try {
    const supabase = createClient(url, key);
    // Insert only: public inquiry submission does not need read access to client records.
    const { error } = await supabase.from("call_requests").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    if (error) {
      return NextResponse.json(
        { error: "Unable to save your inquiry. Please try again." },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send your inquiry. Please try again." },
      { status: 500 },
    );
  }
}
