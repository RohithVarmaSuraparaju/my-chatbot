"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "bot"; text: string };

export default function Chat() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I’m your chatbot. Ask me anything." }
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "bot", text: data.reply || data.error || "(no reply)" }]);
    } catch (e: any) {
      setMsgs((m) => [...m, { role: "bot", text: e.message || "Network error" }]);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-4 min-h-[70vh] flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">Simple Chatbot</h1>

      <div ref={listRef} className="flex-1 overflow-y-auto bg-gray-50 rounded-xl p-4 border">
        {msgs.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-2 rounded-2xl shadow-sm ${
              m.role === "user" ? "bg-blue-100" : "bg-white"
            }`}>
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          onClick={send}
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
