import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Flowcraft's voice assistant on their website. Flowcraft builds new business websites and rebuilds slow, outdated ones for speed, and automates manual business workflows using AI and n8n automation.

Keep answers short (2-3 sentences), friendly, and helpful. Answer questions about services, past projects, and pricing generally.

If the visitor wants to book a call, talk to the team, get a quote, or move forward, tell them you'll pull up a quick form for them to fill in their details.

Always respond in the same language the visitor spoke in.`;

function wantsToBook(text: string): boolean {
  const keywords = ["book", "call", "appointment", "talk to someone", "get in touch", "contact", "quote", "audit"];
  return keywords.some((k) => text.toLowerCase().includes(k));
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    const transcribeForm = new FormData();
    transcribeForm.append("file", audioFile);
    transcribeForm.append("model", "whisper-large-v3-turbo");

    const transcriptionRes = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: transcribeForm,
    });
    const transcriptionData = await transcriptionRes.json();
    if (!transcriptionRes.ok) {
      throw new Error(`Groq transcription failed: ${JSON.stringify(transcriptionData)}`);
    }
    const userText = transcriptionData.text;

    const chatRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userText },
        ],
      }),
    });
    const chatData = await chatRes.json();
    if (!chatRes.ok || !chatData.choices) {
      throw new Error(`Groq chat failed: ${JSON.stringify(chatData)}`);
    }
    const replyText = chatData.choices[0].message.content;

    return NextResponse.json({
      userText,
      replyText,
      showBookingForm: wantsToBook(userText),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Voice chat failed" }, { status: 500 });
  }
}