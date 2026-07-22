import { Resend } from "resend";
import type { Notification } from "@/types";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "GlobalScholar AI <noreply@globalscholar.ai>";

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  if (!resendApiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(resendApiKey);
  }
  return resendClient;
}

export interface EmailService {
  send(to: string, subject: string, html: string): Promise<void>;
  sendBatch(to: string[], subject: string, html: string): Promise<void>;
  sendNotification(to: string, notification: Notification): Promise<void>;
  sendWelcome(to: string, name: string): Promise<void>;
  sendPasswordReset(to: string, resetUrl: string): Promise<void>;
  sendApplicationUpdate(to: string, name: string, scholarshipTitle: string, status: string): Promise<void>;
}

export class ResendEmailService implements EmailService {
  async send(to: string, subject: string, html: string): Promise<void> {
    const client = getResendClient();
    if (!client) {
      console.log(`[Email] (no API key) To: ${to}, Subject: ${subject}`);
      return;
    }
    await client.emails.send({ from: fromEmail, to, subject, html });
  }

  async sendBatch(to: string[], subject: string, html: string): Promise<void> {
    const client = getResendClient();
    if (!client) {
      console.log(`[Email Batch] (no API key) To: ${to.length} recipients, Subject: ${subject}`);
      return;
    }
    await client.batch.send(
      to.map((email) => ({ from: fromEmail, to: email, subject, html }))
    );
  }

  async sendNotification(to: string, notification: Notification): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">GlobalScholar AI</h1>
        </div>
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="margin: 0 0 12px 0; color: #1f2937;">${notification.title}</h2>
          <p style="color: #4b5563; margin: 0 0 16px 0;">${notification.message}</p>
          ${notification.actionUrl ? `<a href="${notification.actionUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">View Details</a>` : ""}
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">You received this because you have a GlobalScholar AI account.</p>
        </div>
      </div>
    `;
    await this.send(to, notification.title, html);
  }

  async sendWelcome(to: string, name: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Welcome to GlobalScholar AI!</h1>
        </div>
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="color: #4b5563;">Hi ${name},</p>
          <p style="color: #4b5563;">Welcome to GlobalScholar AI! We're excited to help you discover scholarship opportunities worldwide.</p>
          <p style="color: #4b5563;">Here's what you can do:</p>
          <ul style="color: #4b5563;">
            <li>Browse thousands of scholarships from around the world</li>
            <li>Use AI-powered search to find perfect matches</li>
            <li>Track your applications in one place</li>
            <li>Get personalized recommendations</li>
          </ul>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://globalscholar.ai"}/scholarships" style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">Start Exploring</a>
        </div>
      </div>
    `;
    await this.send(to, "Welcome to GlobalScholar AI!", html);
  }

  async sendPasswordReset(to: string, resetUrl: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Password Reset</h1>
        </div>
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="color: #4b5563;">You requested a password reset. Click the button below to set a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0;">Reset Password</a>
          <p style="color: #9ca3af; font-size: 12px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
        </div>
      </div>
    `;
    await this.send(to, "Reset your password", html);
  }

  async sendApplicationUpdate(to: string, name: string, scholarshipTitle: string, status: string): Promise<void> {
    const statusColors: Record<string, string> = {
      submitted: "#3b82f6",
      under_review: "#f59e0b",
      accepted: "#10b981",
      rejected: "#ef4444",
      waitlisted: "#8b5cf6",
    };
    const statusLabels: Record<string, string> = {
      submitted: "Submitted",
      under_review: "Under Review",
      accepted: "Accepted",
      rejected: "Not Selected",
      waitlisted: "Waitlisted",
    };
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Application Update</h1>
        </div>
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="color: #4b5563;">Hi ${name},</p>
          <p style="color: #4b5563;">Your application for <strong>${scholarshipTitle}</strong> has been updated:</p>
          <div style="background: ${statusColors[status] || "#6b7280"}15; border-left: 4px solid ${statusColors[status] || "#6b7280"}; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 16px 0;">
            <strong style="color: ${statusColors[status] || "#6b7280"};">${statusLabels[status] || status}</strong>
          </div>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://globalscholar.ai"}/dashboard" style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">View Dashboard</a>
        </div>
      </div>
    `;
    await this.send(to, `Application Update: ${scholarshipTitle}`, html);
  }
}

// Factory
let emailInstance: EmailService | null = null;

export function getEmailService(): EmailService {
  if (!emailInstance) {
    emailInstance = new ResendEmailService();
  }
  return emailInstance;
}
