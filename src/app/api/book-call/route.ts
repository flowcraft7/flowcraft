import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    console.log("Booking attempt:", { name, email, message });

    const { data, error } = await supabase.from("call_requests").insert({ name, email, message }).select();

    if (error) {
      console.error("Supabase insert error:", JSON.stringify(error));
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Booking saved:", data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking route error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}