import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO || "hello@kinetikx.com";

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; org?: string; message?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, org, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields (name, email, message)" },
      { status: 400 }
    );
  }

  const SMTP_HOST = process.env.SMTP_HOST || "mail.kinetikx.com";
  const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Missing SMTP credentials in env");
    return NextResponse.json(
      { ok: false, error: "Server email not configured" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.sendMail({
      from: `"KinetiKx Website" <${SMTP_USER}>`,
      to: TO,
      replyTo: `"${name}" <${email}>`,
      subject: `[Website inquiry] ${name}${org ? ` · ${org}` : ""}`,
      text:
        `New website inquiry\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Organisation: ${org || "—"}\n\n` +
        `Message:\n${message}\n`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Email send failed" },
      { status: 500 }
    );
  }
}
