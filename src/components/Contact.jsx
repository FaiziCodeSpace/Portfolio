"use client";

import { useState } from "react";
import { X, Mail, User, Phone, Send, Lock, MessageSquare, AlignLeft } from "lucide-react";

export function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handle = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required.";
    if (!form.message.trim()) errs.message = "Message is required.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inputWrap = (icon, children) => (
    <div style={{
      display: "flex", alignItems: "center", gap: "8px",
      border: "1px solid var(--color-border)", borderRadius: "10px",
      padding: "0 12px", backgroundColor: "var(--color-secondary)", height: "42px",
    }}>
      <span style={{ color: "var(--color-muted)", flexShrink: 0, display: "flex" }}>{icon}</span>
      {children}
    </div>
  );

  const inputBase = {
    border: "none", background: "transparent", outline: "none",
    fontSize: "14px", color: "var(--color-text-primary)", width: "100%", height: "100%",
  };

  const lbl = (text, required) => (
    <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-muted)", letterSpacing: ".06em", textTransform: "uppercase" }}>
      {text}{required && <span style={{ color: "var(--color-brand)", marginLeft: "3px" }}>*</span>}
    </label>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(400%) rotate(25deg); }
        }
        @keyframes orbit1 {
          0% { transform: rotate(0deg) translateX(90px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(90px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          0% { transform: rotate(180deg) translateX(60px) rotate(-180deg); }
          100% { transform: rotate(540deg) translateX(60px) rotate(-540deg); }
        }
        @keyframes orbit3 {
          0% { transform: rotate(90deg) translateX(115px) rotate(-90deg); }
          100% { transform: rotate(450deg) translateX(115px) rotate(-450deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.85); opacity: 0.25; }
          50% { transform: scale(1.05); opacity: 0.08; }
          100% { transform: scale(0.85); opacity: 0.25; }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes modal-in {
          0% { opacity: 0; transform: scale(0.96) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .contact-modal-wrap {
          animation: modal-in 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
          width: 100%;
          max-width: min(820px, 95vw);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--color-border);
          box-shadow: 0 48px 96px rgba(0,0,0,0.4);
          background-color: var(--color-card);
          display: flex;
          flex-direction: row;
          max-height: 90vh;
        }
        .contact-modal-left { display: none; }
        .contact-modal-right { flex: 1; min-width: 0; overflow-y: auto; }
        .contact-close-mobile { display: flex; }
        .contact-close-desktop { display: none; }
        .contact-grid-2 { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 768px) {
          .contact-modal-left {
            display: flex;
            width: 280px;
            flex-shrink: 0;
            background-color: var(--color-brand);
            padding: 2.5rem 2rem;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
          }
          .contact-close-mobile { display: none; }
          .contact-close-desktop { display: flex; }
          .contact-grid-2 { grid-template-columns: 1fr 1fr; }
        }
        .shimmer-btn::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          animation: shimmer 2.4s ease-in-out infinite;
        }
      `}</style>

      <div className="contact-modal-wrap">

        {/* LEFT PANEL */}
        <div className="contact-modal-left">
          {/* Orbiting dots */}
          {[
            { anim: "orbit1 7s linear infinite", size: 7, color: "rgba(9,9,11,0.25)" },
            { anim: "orbit2 5s linear infinite", size: 5, color: "rgba(9,9,11,0.18)" },
            { anim: "orbit3 9s linear infinite", size: 4, color: "rgba(9,9,11,0.12)" },
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              marginTop: "-3px", marginLeft: "-3px",
              width: `${o.size}px`, height: `${o.size}px`,
              borderRadius: "50%", backgroundColor: o.color,
              animation: o.anim, pointerEvents: "none",
            }} />
          ))}

          {/* Pulse rings */}
          {[{ s: "180px", d: "0s" }, { s: "240px", d: "0.8s" }, { s: "300px", d: "1.6s" }].map((r, i) => (
            <div key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              width: r.s, height: r.s,
              marginTop: `calc(-${r.s} / 2)`, marginLeft: `calc(-${r.s} / 2)`,
              borderRadius: "50%",
              border: "1px solid rgba(9,9,11,0.12)",
              animation: `pulse-ring 3.5s ease-in-out ${r.d} infinite`,
              pointerEvents: "none",
            }} />
          ))}

          <div style={{ position: "relative", zIndex: 1 }}>
            <button
              onClick={onClose}
              className="contact-close-desktop"
              style={{
                width: "30px", height: "30px", borderRadius: "8px", marginBottom: "2rem",
                border: "1px solid rgba(9,9,11,0.15)", background: "rgba(9,9,11,0.08)",
                alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#09090b",
              }}
            >
              <X size={14} />
            </button>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(9,9,11,0.1)", borderRadius: "999px",
              padding: "4px 12px", marginBottom: "1.25rem",
              animation: "float-badge 3s ease-in-out infinite",
            }}>
              <MessageSquare size={12} color="#09090b" />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#09090b", letterSpacing: ".06em", textTransform: "uppercase" }}>
                Get in touch
              </span>
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#09090b", margin: "0 0 8px", lineHeight: 1.15 }}>
              Let's talk
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(9,9,11,0.65)", margin: "0 0 2rem", lineHeight: 1.6 }}>
              Have a question or idea? Drop us a message and we'll get back to you promptly.
            </p>

            {/* Contact info rows */}
            {[
              { icon: <Mail size={15} color="#09090b" />, label: "Email", value: "hello@yoursite.com" },
              { icon: <Phone size={15} color="#09090b" />, label: "Phone", value: "+1 (555) 000-0000" },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: "rgba(9,9,11,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(9,9,11,0.5)", textTransform: "uppercase", letterSpacing: ".05em", margin: "0 0 1px" }}>{label}</p>
                  <p style={{ fontSize: "13px", color: "#09090b", fontWeight: 500, margin: 0 }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "12px", color: "rgba(9,9,11,0.4)", margin: 0, marginTop: "2rem", position: "relative", zIndex: 1 }}>
            We read every message personally.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="contact-modal-right">
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "3rem 2.5rem", textAlign: "center", gap: "1.25rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Send size={22} color="#09090b" strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-text-primary)", margin: "0 0 8px" }}>Message sent!</h3>
                <p style={{ fontSize: "14px", color: "var(--color-muted)", margin: 0 }}>
                  We'll get back to you within 24 hours.
                </p>
              </div>
              <button onClick={onClose} style={{ padding: "11px 32px", borderRadius: "10px", border: "none", backgroundColor: "var(--color-brand)", color: "#09090b", fontWeight: 700, fontSize: "14px", cursor: "pointer", marginTop: "8px" }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.1rem", boxSizing: "border-box" }}>

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Send a message</h3>
                  <p style={{ fontSize: "13px", color: "var(--color-muted)", margin: 0 }}>We'll get back to you within 24 hours.</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="contact-close-mobile"
                  style={{
                    width: "30px", height: "30px", flexShrink: 0, borderRadius: "8px",
                    border: "1px solid var(--color-border)", background: "var(--color-secondary)",
                    alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "var(--color-muted)",
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              <div className="contact-grid-2">
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {lbl("Name")}
                  {inputWrap(<User size={15} />, <input type="text" name="name" value={form.name} onChange={handle} placeholder="John Doe" style={inputBase} />)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {lbl("Email", true)}
                  {inputWrap(<Mail size={15} />, <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@company.com" style={inputBase} />)}
                  {errors.email && <span style={{ fontSize: "12px", color: "var(--color-brand)", fontWeight: 500 }}>{errors.email}</span>}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {lbl("Subject")}
                {inputWrap(<AlignLeft size={15} />, <input type="text" name="subject" value={form.subject} onChange={handle} placeholder="What's this about?" style={inputBase} />)}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {lbl("Message", true)}
                <div style={{ border: "1px solid var(--color-border)", borderRadius: "10px", padding: "10px 12px", backgroundColor: "var(--color-secondary)" }}>
                  <textarea name="message" value={form.message} onChange={handle} rows={4}
                    placeholder="Tell us what's on your mind…"
                    style={{ border: "none", background: "transparent", outline: "none", fontSize: "14px", color: "var(--color-text-primary)", width: "100%", resize: "none", lineHeight: "1.6", minHeight: "90px" }}
                  />
                </div>
                {errors.message && <span style={{ fontSize: "12px", color: "var(--color-brand)", fontWeight: 500 }}>{errors.message}</span>}
              </div>

              <button type="submit" className="shimmer-btn" style={{
                position: "relative", overflow: "hidden",
                width: "100%", height: "46px", borderRadius: "10px", border: "none",
                backgroundColor: "var(--color-brand)", color: "#09090b",
                fontSize: "14px", fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}>
                <Send size={15} />
                Send message
              </button>

              <p style={{ textAlign: "center", fontSize: "12px", color: "var(--color-muted)", margin: 0 }}>
                <Lock size={11} style={{ verticalAlign: "-1px", marginRight: "4px" }} />
                Your info is private and never shared.
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}