"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CHAT_INTRO, CHAT_QA, type ChatQA } from "@/data/chat";
import { ChatIcon } from "@/components/ui/Icon";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<ChatQA[]>([]);

  const askedQuestions = new Set(log.map((entry) => entry.question));
  const remaining = CHAT_QA.filter((qa) => !askedQuestions.has(qa.question));

  return (
    <div className="fixed right-5 bottom-5 z-[250] flex flex-col items-end gap-3 md:right-8 md:bottom-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex max-h-[70vh] w-[86vw] max-w-[360px] flex-col overflow-hidden rounded-[20px] border border-charcoal/10 bg-paper-bright text-charcoal shadow-[0_30px_60px_-20px_rgba(20,20,18,0.4)]"
          >
            <div className="flex items-center justify-between bg-charcoal px-5 py-4 text-paper">
              <div>
                <div className="font-mono-label text-[9px] tracking-[0.2em] opacity-60">AULMO</div>
                <div className="text-sm font-bold">Desk Assistant</div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="text-paper/60 transition-colors hover:text-paper"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <p className="m-0 text-pretty text-[13px] leading-relaxed opacity-70">
                {CHAT_INTRO}
              </p>

              {log.length > 0 && (
                <div className="mt-4 flex flex-col gap-3">
                  {log.map((entry, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="self-end rounded-2xl rounded-br-sm bg-charcoal px-3.5 py-2 text-[13px] font-medium text-paper">
                        {entry.question}
                      </div>
                      <div className="self-start rounded-2xl rounded-bl-sm border border-charcoal/10 bg-paper px-3.5 py-2 text-[13px] leading-relaxed">
                        {entry.answer}
                        {entry.href && (
                          <a
                            href={entry.href}
                            className="mt-1.5 block font-mono-label text-[10px] font-bold tracking-[0.14em] text-signal-red uppercase"
                          >
                            {entry.hrefLabel ?? "Learn more"} →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {remaining.length > 0 ? (
              <div className="flex flex-wrap gap-2 border-t border-charcoal/10 p-4">
                {remaining.map((qa) => (
                  <button
                    key={qa.question}
                    type="button"
                    onClick={() => setLog((prev) => [...prev, qa])}
                    className="rounded-full border border-charcoal/20 px-3.5 py-2 text-left text-[12.5px] font-medium transition-colors duration-300 hover:border-charcoal/50"
                  >
                    {qa.question}
                  </button>
                ))}
              </div>
            ) : (
              log.length > 0 && (
                <div className="border-t border-charcoal/10 p-4">
                  <button
                    type="button"
                    onClick={() => setLog([])}
                    className="font-mono-label text-[10px] tracking-[0.16em] opacity-50 transition-opacity hover:opacity-80"
                  >
                    RESTART
                  </button>
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {!open && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-signal-red"
            animate={{ scale: [1, 1.7, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <button
          type="button"
          aria-label={open ? "Close chat" : "Open chat"}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-paper-bright shadow-[0_16px_40px_-12px_rgba(20,20,18,0.5)] ring-1 ring-paper/15 transition-[transform,background-color] duration-300 hover:scale-[1.08] hover:bg-signal-red active:scale-[0.96]"
        >
          <ChatIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
