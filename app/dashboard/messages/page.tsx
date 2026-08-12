"use client";

import { useState } from "react";
import { Inbox, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader } from "@/components/ui/feedback";
import { messages as seed } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [threads, setThreads] = useState(seed);
  const [activeId, setActiveId] = useState(seed[0]?.id || "");
  const [draft, setDraft] = useState("");
  const active = threads.find((t) => t.id === activeId);

  function send() {
    if (!draft.trim() || !active) return;
    setThreads((list) =>
      list.map((t) =>
        t.id === active.id
          ? {
              ...t,
              preview: draft.trim(),
              unread: false,
              thread: [
                ...t.thread,
                { id: String(Date.now()), sender: "You", body: draft.trim(), time: "Just now" },
              ],
            }
          : t
      )
    );
    setDraft("");
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Inbox" description="Secure messaging with your care team." />

      <div className="grid h-[min(70vh,640px)] overflow-hidden rounded-2xl border border-line bg-surface-raised lg:grid-cols-[300px_1fr]">
        <div className="border-b border-line lg:border-b-0 lg:border-r">
          <ul className="max-h-[40vh] overflow-y-auto lg:max-h-full">
            {threads.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(t.id);
                    setThreads((list) => list.map((x) => (x.id === t.id ? { ...x, unread: false } : x)));
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-muted",
                    activeId === t.id && "bg-brand-50 dark:bg-brand-100/50"
                  )}
                >
                  <Avatar name={t.from} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate font-semibold text-ink">{t.from}</span>
                      <span className="shrink-0 text-[11px] text-ink-soft">{t.time}</span>
                    </span>
                    <span className={cn("line-clamp-1 text-body-sm", t.unread ? "font-medium text-ink" : "text-ink-muted")}>
                      {t.preview}
                    </span>
                  </span>
                  {t.unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {active ? (
          <div className="flex min-h-0 flex-col">
            <div className="border-b border-line px-4 py-3">
              <h2 className="font-semibold text-ink">{active.from}</h2>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {active.thread.map((m) => (
                <div key={m.id} className={cn("flex", m.sender === "You" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-3.5 py-2.5 text-body-sm",
                      m.sender === "You" ? "bg-brand-600 text-white" : "bg-surface-muted text-ink"
                    )}
                  >
                    <p>{m.body}</p>
                    <p className={cn("mt-1 text-[11px]", m.sender === "You" ? "text-white/70" : "text-ink-soft")}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-line p-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Write a secure message…"
                className="h-11 flex-1 rounded-xl border border-line bg-surface px-3 text-body-sm focus:border-brand-500 focus:shadow-focus"
                aria-label="Message"
              />
              <Button aria-label="Send message" onClick={send}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={Inbox}
            title="No conversation selected"
            description="Choose a thread from the list to read and reply."
          />
        )}
      </div>
    </div>
  );
}
