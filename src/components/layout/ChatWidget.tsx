"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SERVICE_LINKS } from "@/data/site";

type Step = {
  id: "treatment" | "name" | "email" | "phone" | "location";
  prompt: string;
  /** Present: the answer is picked from chips and typing is disabled. */
  options?: string[];
  /** Returns an error to send back as a bot message, or null to accept. */
  validate?: (value: string) => string | null;
};

/** The scripted lead-capture flow, in the order the live widget asks it. */
const STEPS: Step[] = [
  {
    id: "treatment",
    prompt: "Which treatment are you interested in?",
    options: SERVICE_LINKS.map((s) => s.label),
  },
  { id: "name", prompt: "May I know your name?" },
  {
    id: "email",
    prompt: "What is a good email address to contact you with?",
    validate: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
        ? null
        : "That email address doesn't look quite right — could you check it?",
  },
  {
    id: "phone",
    prompt: "May I know your Phone Number",
    validate: (v) =>
      v.replace(/\D/g, "").length >= 10
        ? null
        : "Could you share a phone number with at least 10 digits?",
  },
  {
    id: "location",
    prompt: "May I know your preferred location?",
    options: ["Madinaguda, Hyderabad", "Kondapur, Raghavendra Colony, Hyderabad"],
  },
];

const CLOSING =
  "Thank you for contacting Aura Dental 😊\n\nOur team will contact you shortly regarding your treatment enquiry.";

/** The opening pair carries no timestamp, matching the live widget. */
const OPENING: Msg[] = [
  { id: 1, from: "bot", text: "Hi 👋 Welcome to Aura Dental." },
  { id: 2, from: "bot", text: STEPS[0].prompt },
];

type Msg = { id: number; from: "bot" | "user"; text: string; at?: string };

/** Survives a reload but not a new tab — the same as a real chat session. */
const STORE_KEY = "aura-chat";

const stamp = () =>
  new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.6]">
      <path d="M8 13.5h6M8 10h8" strokeLinecap="round" />
      <path
        d="M3.5 15.5V6.8c0-1.3 1-2.3 2.3-2.3h12.4c1.3 0 2.3 1 2.3 2.3v6.4c0 1.3-1 2.3-2.3 2.3H8.6L4.7 18.7c-.6.4-1.2 0-1.2-.7v-2.5Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  /** Once opened, the launcher's unread pip stays gone. */
  const [seen, setSeen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(OPENING);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  /** Blocks the save effect until the stored session has been read back. */
  const [restored, setRestored] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  const step: Step | null = stepIndex < STEPS.length ? STEPS[stepIndex] : null;
  const canType = open && !typing && !!step && !step.options;

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setMsgs(saved.msgs);
        setStepIndex(saved.stepIndex);
        setAnswers(saved.answers);
        setSeen(saved.seen);
      }
    } catch {
      /* A blocked or corrupt store just means the visitor starts over. */
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ msgs, stepIndex, answers, seen }));
    } catch {
      /* Private mode — the conversation simply won't survive a reload. */
    }
  }, [restored, msgs, stepIndex, answers, seen]);

  // Timers outlive a step change, so clear them if the widget ever unmounts.
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, open]);

  useEffect(() => {
    if (canType) inputRef.current?.focus();
  }, [canType]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /** Back to the greeting, the way the live widget's "click here" behaves. */
  const restart = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setTyping(false);
    setDraft("");
    setAnswers({});
    setStepIndex(0);
    setMsgs(OPENING);
  }, []);

  /** Types for a beat, then posts a bot message. */
  const say = useCallback((text: string, after = 700) => {
    setTyping(true);
    const id = window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: Date.now() + m.length, from: "bot", text, at: stamp() }]);
    }, after);
    timers.current.push(id);
  }, []);

  const answer = useCallback(
    (raw: string) => {
      const value = raw.trim();
      if (!value || !step || typing) return;

      const error = step.validate?.(value);
      setMsgs((m) => [...m, { id: Date.now() + m.length, from: "user", text: value, at: stamp() }]);
      setDraft("");

      // A rejected answer re-asks rather than advancing.
      if (error) {
        say(error);
        return;
      }

      const filled = { ...answers, [step.id]: value };
      setAnswers(filled);
      setStepIndex(stepIndex + 1);

      const nextStep = STEPS[stepIndex + 1];
      if (nextStep) {
        say(nextStep.prompt);
        return;
      }

      say(CLOSING, 900);
      // Best effort: a failed hand-off must not block the visitor's thank-you.
      fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filled),
      }).catch(() => {});
    },
    [answers, say, step, stepIndex, typing]
  );

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setSeen(true);
        }}
        aria-label="Chat with Aura Dental"
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#1d4231] text-white shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition-transform hover:scale-105"
      >
        <ChatIcon />
        {!seen && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#e8467c] text-[11px] font-bold leading-none text-white">
            1
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Chat with Aura Dental"
      className={`fixed inset-x-3 bottom-3 top-3 z-[90] flex flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.3)] sm:inset-auto sm:bottom-5 sm:right-5 ${
        expanded ? "sm:h-[86vh] sm:w-[460px]" : "sm:h-[620px] sm:w-[380px]"
      }`}
    >
      <div className="flex items-center gap-3 bg-[#1d4231] px-4 py-3 text-white">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/90">
          <Image
            src="/images/aura-dental-logo-2.png"
            alt=""
            width={65}
            height={36}
            className="h-auto w-6 object-contain"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#1d4231] bg-[#19c9a4]" />
        </span>

        <span className="flex-1 text-[17px] font-bold">Aura Dental</span>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Shrink the chat" : "Expand the chat"}
          className="hidden h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/15 sm:flex"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close the chat"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/15"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {msgs.map((m, i) => {
          const startsRun = msgs[i - 1]?.from !== m.from;

          if (m.from === "user") {
            return (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-[10px] bg-[#1d4231] px-4 py-2.5">
                  <span className="block text-[15px] leading-[1.45] text-white">{m.text}</span>
                  {m.at && (
                    <span className="mt-1 block text-right text-[11px] text-white/70">{m.at}</span>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={m.id} className="flex items-start gap-2">
              {/* The avatar heads a run of bot messages; later ones indent to match */}
              <span className="h-8 w-8 shrink-0">
                {startsRun && (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d4231]">
                    <Image
                      src="/images/aura-dental-logo-2.png"
                      alt=""
                      width={65}
                      height={36}
                      className="h-auto w-5 object-contain"
                    />
                  </span>
                )}
              </span>

              <div className="max-w-[80%]">
                {/* The greeting pair is unlabelled, every later reply is named */}
                {startsRun && i > 1 && (
                  <span className="mb-1 block text-[13px] font-bold text-[#1d4231]">Aura Dental</span>
                )}
                <div className="rounded-[10px] bg-[#f1f1f1] px-4 py-2.5">
                  <span className="block whitespace-pre-line text-[15px] leading-[1.45] text-[#333]">
                    {m.text}
                  </span>
                  {m.at && <span className="mt-1 block text-[11px] text-[#8a8a8a]">{m.at}</span>}
                </div>
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="flex items-start gap-2">
            <span className="h-8 w-8 shrink-0" />
            <div className="flex gap-1 rounded-[10px] bg-[#f1f1f1] px-4 py-3.5">
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  style={{ animationDelay: `${d}ms` }}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9a9a9a]"
                />
              ))}
            </div>
          </div>
        )}

        {step?.options && !typing && (
          <div className="flex flex-wrap gap-2 pl-10">
            {step.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => answer(option)}
                className="rounded-[8px] border border-[#d5d5d5] bg-white px-3.5 py-2 text-left text-[14px] text-[#1d4231] transition-colors hover:border-[#1d4231] hover:bg-[#f6f6f6]"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* The composer stays through the closing message, then hands over to the
          end-of-chat notice — `typing` keeps it in place until that lands. */}
      {step || typing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            answer(draft);
          }}
          className="border-t border-[#ececec] p-3"
        >
          <div
            className={`flex items-center gap-2 rounded-[24px] border px-4 py-2 ${
              canType ? "border-[#c9c9c9]" : "border-[#e2e2e2]"
            }`}
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={!canType}
              placeholder={canType ? "Write a message..." : ""}
              aria-label="Write a message"
              className="h-8 flex-1 bg-transparent text-[15px] text-[#333] outline-none placeholder:text-[#8a8a8a]"
            />
            <button
              type="submit"
              disabled={!canType || !draft.trim()}
              aria-label="Send"
              className="shrink-0 text-[#1d4231] transition-opacity disabled:opacity-30"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
                <path d="M4 11.5 20.5 4l-7.5 16.5-2.2-7L4 11.5Z" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </form>
      ) : (
        <div className="border-t border-[#ececec] px-4 py-4 text-center text-[15px] leading-[1.6] text-[#333]">
          <span className="block">Your chat has ended.</span>
          <span className="block">
            To start a new chat,{" "}
            <button
              type="button"
              onClick={restart}
              className="underline underline-offset-2 transition-colors hover:text-[#1d4231]"
            >
              click here
            </button>
            .
          </span>
        </div>
      )}
    </div>
  );
}
