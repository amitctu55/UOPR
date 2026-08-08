"use client";

import { useState } from "react";
import {
  Mic,
  MicOff,
  MonitorUp,
  Paperclip,
  PhoneOff,
  Send,
  Video,
  VideoOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function TelemedicineRoomPage({ params }: { params: { id: string } }) {
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [chat, setChat] = useState([
    { id: "1", from: "Dr. Marcus Webb", text: "Can you hear me clearly?", self: false },
    { id: "2", from: "You", text: "Yes — audio and video look good.", self: true },
  ]);
  const [draft, setDraft] = useState("");

  function send() {
    if (!draft.trim()) return;
    setChat((c) => [...c, { id: String(Date.now()), from: "You", text: draft.trim(), self: true }]);
    setDraft("");
  }

  return (
    <div className="animate-fade-in -m-4 flex min-h-[calc(100vh-4rem)] flex-col sm:-m-6 lg:-m-8">
      <div className="flex items-center justify-between border-b border-line bg-surface-raised px-4 py-3 sm:px-6">
        <div>
          <h1 className="font-display text-heading-sm text-ink">Telemedicine room</h1>
          <p className="text-body-sm text-ink-muted">Session {params.id} · Encrypted</p>
        </div>
        <Badge tone="success">Live</Badge>
      </div>

      <div className="grid flex-1 lg:grid-cols-[1fr_320px]">
        <div className="relative flex flex-col bg-brand-900 text-white">
          <div className="relative flex flex-1 items-center justify-center overflow-hidden p-6">
            <div
              className={cn(
                "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(12,143,134,0.35),_transparent_60%)]",
                camOff && "opacity-40"
              )}
            />
            <div className="relative z-10 text-center">
              <Avatar name="Dr. Marcus Webb" size="lg" className="mx-auto h-20 w-20 text-lg" />
              <p className="mt-4 font-display text-heading-md">Dr. Marcus Webb</p>
              <p className="text-body-sm text-white/70">Cardiology · {camOff ? "Camera off" : "HD video"}</p>
            </div>
            <div className="absolute bottom-6 right-6 h-36 w-52 overflow-hidden rounded-2xl border border-white/20 bg-brand-800 shadow-lift">
              <div className="flex h-full items-center justify-center">
                {camOff ? (
                  <VideoOff className="h-8 w-8 text-white/50" />
                ) : (
                  <div className="text-center">
                    <Avatar name="You" />
                    <p className="mt-2 text-xs text-white/70">You</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-white/10 bg-brand-950/60 px-4 py-4 backdrop-blur">
            <Button
              variant="secondary"
              size="icon"
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => setMuted(!muted)}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label={camOff ? "Start camera" : "Stop camera"}
              onClick={() => setCamOff(!camOff)}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              {camOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Share screen"
              onClick={() => setSharing(!sharing)}
              className={cn(
                "border-white/20 bg-white/10 text-white hover:bg-white/20",
                sharing && "ring-2 ring-care-500"
              )}
            >
              <MonitorUp className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Attach file"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="danger" className="ml-2">
              <PhoneOff className="h-4 w-4" />
              End call
            </Button>
          </div>
        </div>

        <aside className="flex flex-col border-l border-line bg-surface-raised">
          <div className="border-b border-line px-4 py-3">
            <h2 className="font-semibold text-ink">Visit chat</h2>
            <p className="text-body-sm text-ink-soft">Messages stay with the encounter</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {chat.map((m) => (
              <div key={m.id} className={cn("flex", m.self ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-body-sm",
                    m.self ? "bg-brand-600 text-white" : "bg-surface-muted text-ink"
                  )}
                >
                  {!m.self && <p className="mb-0.5 text-[11px] font-semibold opacity-70">{m.from}</p>}
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-line p-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="h-10 flex-1 rounded-xl border border-line bg-surface px-3 text-body-sm focus:border-brand-500 focus:shadow-focus"
              aria-label="Chat message"
            />
            <Button size="icon" aria-label="Send" onClick={send}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
