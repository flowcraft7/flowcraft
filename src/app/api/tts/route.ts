import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (typeof text !== "string" || !text.trim() || text.length > 3000) {
      return NextResponse.json(
        { error: "Provide text up to 3,000 characters." },
        { status: 400 },
      );
    }
    if (!process.env.GOOGLE_TTS_API_KEY) {
      return NextResponse.json(
        { error: "Cloud speech is not configured. Use browser speech." },
        { status: 503 },
      );
    }

    const res = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: "en-US", name: "en-US-Neural2-F" },
          audioConfig: { audioEncoding: "MP3" },
        }),
      },
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Google TTS failed: ${JSON.stringify(data)}`);
    }

    return NextResponse.json({ audioContent: data.audioContent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "TTS failed" }, { status: 500 });
  }
}
