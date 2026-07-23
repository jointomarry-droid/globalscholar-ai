"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { useUIStore } from "@/store";
import {
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Phone,
} from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@globalscholar.ai", href: "mailto:hello@globalscholar.ai" },
  { icon: MessageSquare, label: "Support", value: "support@globalscholar.ai", href: "mailto:support@globalscholar.ai" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA", href: null },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
];

export default function ContactPage() {
  const { addToast } = useUIStore();
  const [form, setForm] = useState<ContactInput>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactInput;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    addToast({ type: "success", title: "Message sent!", message: "We'll get back to you within 24 hours." });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-[var(--muted-foreground)]">
              Have a question, suggestion, or want to partner with us? We&apos;d love to hear
              from you.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)] shrink-0">
                    <info.icon className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="text-sm text-[var(--primary)] hover:underline">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-[var(--muted-foreground)]">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-[var(--primary)]/5 to-transparent border-[var(--primary)]/20">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-2">Partnership Inquiries</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-3">
                  Universities, governments, and organizations: let&apos;s work together to
                  connect students with opportunities.
                </p>
                <a
                  href="mailto:partnerships@globalscholar.ai"
                  className="text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  partnerships@globalscholar.ai
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-16 w-16 text-[var(--success)] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                    <p className="text-[var(--muted-foreground)] mb-6">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className="mt-1"
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          className="mt-1"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="How can we help?"
                        className="mt-1"
                      />
                      {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Message</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us more..."
                        rows={6}
                        className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                      />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                    </div>
                    <Button type="submit" size="lg" disabled={loading}>
                      {loading ? "Sending..." : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
