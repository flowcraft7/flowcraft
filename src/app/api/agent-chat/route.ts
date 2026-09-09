import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a demo AI chat agent embedded on a business website. Pretend you work for "Bella's Salon," a small hair and beauty salon. Answer questions about services, hours, and booking in a friendly, brief way (2-3 sentences max). If asked to book, say you'd normally check the calendar and confirm a time — this is just a demo.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const chatRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
      }),
    });

    const chatData = await chatRes.json();
    if (!chatRes.ok || !chatData.choices) {
      throw new Error(`Groq chat failed: ${JSON.stringify(chatData)}`);
    }

    return NextResponse.json({ reply: chatData.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}