"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScholarshipCard } from "@/components/scholarship/scholarship-card";
import type { Scholarship } from "@/types";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
  Lightbulb,
  MapPin,
  GraduationCap,
  Banknote,
} from "lucide-react";

const suggestedQueries = [
  "I'm from Pakistan with 3.6 CGPA, want fully funded Master's in Germany without IELTS",
  "Find PhD scholarships in Computer Science in the United States",
  "What scholarships are available for Nigerian students in the UK?",
  "I need a fully funded scholarship for Environmental Science in Canada",
  "Show me scholarships with no GRE requirement for Indian students",
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  results?: Scholarship[];
  suggestions?: string[];
}

export default function AISearchPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AI scholarship advisor. Tell me about your background and what you're looking for, and I'll find the best matching scholarships for you.\n\nYou can ask me things like:\n- What scholarships match my profile?\n- Find fully funded Master's programs in Germany\n- Which scholarships don't require IELTS?",
      suggestions: suggestedQueries.slice(0, 3),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (query?: string) => {
    const text = query || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context: { type: "search" },
        }),
      });

      const result = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: result.success
          ? result.data.answer
          : "I'm sorry, I couldn't process your request. Please try again.",
        results: result.success ? result.data.scholarships : undefined,
        suggestions: result.success ? result.data.suggestions : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "I'm sorry, there was a connection error. Please try again.",
        suggestions: ["Try again", "Show me fully funded scholarships", "Find scholarships by country"],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-btn">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">AI Scholarship Advisor</h1>
              <p className="text-xs text-[var(--muted-foreground)]">
                Ask anything about scholarships worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6">
          <div className="space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-btn shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--card)] border border-[var(--border)]"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>

                  {/* AI Results */}
                  {msg.results && msg.results.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {msg.results.map((s) => (
                        <ScholarshipCard key={s.id} scholarship={s} />
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(s)}
                          className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--secondary)] shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-btn shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing your query...
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-4">
          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              { icon: MapPin, label: "By Country" },
              { icon: GraduationCap, label: "By Degree" },
              { icon: Banknote, label: "Fully Funded" },
              { icon: Lightbulb, label: "No IELTS" },
            ].map((prompt) => (
              <button
                key={prompt.label}
                onClick={() => handleSend(`Show me ${prompt.label.toLowerCase()} scholarships`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
              >
                <prompt.icon className="h-3 w-3" />
                {prompt.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Tell me about your background and what scholarship you're looking for..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
