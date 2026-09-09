"use client";

import { useState, useRef } from "react";
import { Mic, Square } from "lucide-react";

export default function VoiceAgentDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
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
      const utterance = new SpeechSynthesisUtterance(data.replyText);
      speechSynthesis.speak(utterance);
    } catch {
      setReply("Sorry, something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="mt-6 rounded-lg border border-signal bg-signal-dim p-4 text-center">
      <p className="font-mono text-xs uppercase tracking-wide text-signal">Live demo — call the receptionist</p>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition hover:bg-signal disabled:opacity-50"
      >
        {isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </button>
      {isProcessing && <p className="mt-2 text-xs text-ink-soft">Thinking...</p>}
      {transcript && <p className="mt-3 text-left text-xs text-ink-soft">You: {transcript}</p>}
      {reply && <p className="mt-1 text-left text-sm text-ink">{reply}</p>}
    </div>
  );
}