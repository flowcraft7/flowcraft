"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatAgentDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Bella's Salon's AI assistant. Ask me about hours, services, or booking.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      if (!res.ok || typeof data.reply !== "string")
        throw new Error("Chat unavailable");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, something went wrong.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-lg border border-line bg-paper p-4">
      <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">
        Live demo — try it
      </p>
      <div
        role="log"
        aria-live="polite"
        className="mt-3 max-h-48 space-y-2 overflow-y-auto"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-md px-3 py-2 text-sm ${
              msg.role === "user"
                ? "ml-8 bg-ink text-paper"
                : "mr-8 bg-white text-ink"
            }`}
          >
            {msg.content}
          </motion.div>
        ))}
        {loading && <p className="text-xs text-ink-soft">Typing...</p>}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          aria-label="Message Bella’s Salon demo assistant"
          maxLength={1000}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about hours, services..."
          className="flex-1 rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-signal focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="Send demo message"
          className="flex items-center justify-center rounded-md bg-ink px-3 py-2 text-paper hover:bg-signal disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
