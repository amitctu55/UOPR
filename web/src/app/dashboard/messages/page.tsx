"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader, Skeleton } from "@/components/ui/feedback";
import { api } from "@/lib/api";
import type { MessageThread } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const qc = useQueryClient();
  const { data: threads = [], isLoading } = useQuery({ queryKey: ["messages"], queryFn: api.messages });
  const [activeId, setActiveId] = useState("");
  const [draft, setDraft] = useState("");
  const send = useMutation({
    mutationFn: ({ id, body }: { id: string; body: string }) => api.sendMessage(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });

  useEffect(() => {
    if (!activeId && threads[0]) setActiveId(threads[0].id);
  }, [threads, activeId]);

  const active: MessageThread | undefined = threads.find((t) => t.id === activeId);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Inbox" description="Secure messaging with your care team." />
      {isLoading ? <Skeleton className="h-[min(70vh,640px)] w-full" /> : (
        <div className="grid h-[min(70vh,640px)] overflow-hidden rounded-2xl border border-line bg-surface-raised lg:grid-cols-[300px_1fr]">
          <div className="border-b border-line lg:border-b-0 lg:border-r">
            <ul className="max-h-[40vh] overflow-y-auto lg:max-h-full">
              {threads.map((t) => (
                <li key={t.id}>
                  <button type="button" onClick={() => setActiveId(t.id)} className={cn("flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-muted", activeId === t.id && "bg-brand-50 dark:bg-brand-100/50")}>
                    <Avatar name={t.from_name} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2"><span className="truncate font-semibold text-ink">{t.from_name}</span><span className="shrink-0 text-[11px] text-ink-soft">{t.time}</span></span>
                      <span className={cn("line-clamp-1 text-body-sm", t.unread ? "font-medium text-ink" : "text-ink-muted")}>{t.preview}</span>
                    </span>
                    {t.unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {active ? (
            <div className="flex min-h-0 flex-col">
              <div className="border-b border-line px-4 py-3"><h2 className="font-semibold text-ink">{active.from_name}</h2></div>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {active.messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.sender === "You" ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[75%] rounded-2xl px-3.5 py-2.5 text-body-sm", m.sender === "You" ? "bg-brand-600 text-white" : "bg-surface-muted text-ink")}>
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
                  onKeyDown={(e) => {
                    if (e.key !== "Enter" || !draft.trim()) return;
                    send.mutate({ id: active.id, body: draft.trim() });
                    setDraft("");
                  }}
                  placeholder="Write a secure message…"
                  aria-label="Message"
                  className="h-11 flex-1 rounded-xl border border-line bg-surface px-3 text-body-sm focus:border-brand-500 focus:shadow-focus"
                />
                <Button
                  aria-label="Send message"
                  loading={send.isPending}
                  onClick={() => {
                    if (!draft.trim()) return;
                    send.mutate({ id: active.id, body: draft.trim() });
                    setDraft("");
                  }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <EmptyState icon={Inbox} title="No conversation selected" description="Choose a thread from the list to read and reply." />
          )}
        </div>
      )}
    </div>
  );
}
