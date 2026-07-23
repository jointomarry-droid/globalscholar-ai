"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Globe,
  GraduationCap,
  BookOpen,
  DollarSign,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  { icon: Globe, label: "Best universities for CS?", query: "What are the best universities for studying Computer Science abroad?" },
  { icon: GraduationCap, label: "Fully funded scholarships", query: "List fully funded scholarships for international students in 2025-2026." },
  { icon: DollarSign, label: "Cheapest study destinations", query: "What are the cheapest countries to study abroad for international students?" },
  { icon: BookOpen, label: "IELTS requirements", query: "What are the IELTS requirements for top UK universities?" },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI University Assistant. I can help you with:\n\n- University recommendations\n- Scholarship information\n- Visa requirements\n- Cost of living comparisons\n- Application guidance\n\nAsk me anything about studying abroad!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (query?: string) => {
    const text = query || input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.data?.content || data.response || "I apologize, but I'm unable to process your request at the moment. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "I'm having trouble connecting to my AI brain right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <Badge variant="info" className="mb-4">
            <MessageCircle className="h-3 w-3 mr-1" />
            AI University Chatbot
          </Badge>
          <h1 className="text-3xl font-bold mb-2">
            University <span className="gradient-text">Assistant</span>
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Ask anything about universities, scholarships, visas, and studying abroad.
          </p>
        </div>

        {/* Chat Area */}
        <Card className="mb-4">
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-btn flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-[var(--primary)] text-white rounded-br-sm"
                        : "bg-[var(--accent)] rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-btn flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-[var(--accent)] p-3 rounded-2xl rounded-bl-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-[var(--primary)]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {suggestedQuestions.map((q) => (
              <button
                key={q.label}
                onClick={() => sendMessage(q.query)}
                className="p-3 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  <q.icon className="h-4 w-4 text-[var(--primary)]" />
                  <span className="text-sm font-medium">{q.label}</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{q.query}</p>
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Ask about universities, scholarships, visas..."
            className="flex-1 px-4 py-3 rounded-xl border border-[var(--input)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            disabled={loading}
          />
          <Button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="gradient-btn px-6"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}