"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";

export default function VoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", message: "" });
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];

    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = handleStop;

    recorder.start(250);
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }

  async function handleStop() {
    setIsProcessing(true);
    const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const res = await fetch("/api/voice-chat", { method: "POST", body: formData });
      const data = await res.json();
      setTranscript(data.userText || "");
      setReply(data.replyText || "");
      if (data.showBookingForm) setShowForm(true);

      const utterance = new SpeechSynthesisUtterance(data.replyText);
      speechSynthesis.speak(utterance);
    } catch {
      setReply("Sorry, something went wrong. Try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm),
      });
      const data = await res.json();
      console.log("Booking response:", data);
      if (!res.ok) throw new Error(data.error || "Failed");
      setFormStatus("success");
    } catch (err) {
      console.error("Booking error:", err);
      setFormStatus("idle");
    }
  }

  return (
    <motion.section
      id="ask"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-b border-line py-24"
    >
      <div className="mx-auto max-w-xl px-6 text-center lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">Ask Flowcraft</h2>
        <p className="mt-4 text-ink-soft">Tap the mic and ask us anything about your website.</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-paper transition hover:bg-signal disabled:opacity-50"
        >
          {isRecording ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </motion.button>

        {isProcessing && <p className="mt-4 text-sm text-ink-soft">Thinking...</p>}

        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-lg border border-line bg-white p-6 text-left"
          >
            <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">You said</p>
            <p className="mt-2 text-sm text-ink">{transcript}</p>
          </motion.div>
        )}

        {reply && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 rounded-lg border border-signal bg-signal-dim p-6 text-left"
          >
            <p className="font-mono text-xs uppercase tracking-wide text-signal">Flowcraft</p>
            <p className="mt-2 text-sm text-ink">{reply}</p>
          </motion.div>
        )}

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-6 rounded-lg border border-automate bg-white p-6 text-left"
          >
            {formStatus === "success" ? (
              <p className="text-sm font-medium text-ink">Submitted! We&apos;ll reach out shortly.</p>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-wide text-automate">Book a call</p>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-signal focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-signal focus:outline-none"
                />
                <textarea
                  placeholder="Anything you'd like us to know?"
                  rows={2}
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-signal focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-signal disabled:opacity-50"
                >
                  {formStatus === "loading" ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}