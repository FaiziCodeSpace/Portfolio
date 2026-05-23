"use client";

import { useState } from "react";
import { X, Zap, BarChart2, Briefcase, Crown, Check, Mail, User, Phone, Globe, Calendar, Clock, Send, Lock } from "lucide-react";

const plans = [
  {
    id: "basic",
    tag: "Live fast",
    icon: Zap,
    name: "Basic",
    desc: "Hardcoded. Lightning fast. Perfect for a strong presence.",
    price: "500",
    currency: "€",
    features: [
      "Hardcoded performance (100/100)",
      "Up to 5 sections",
      "Mobile-first design",
      "Contact form & tracking",
      "1x revision round",
    ],
    cta: "Start Basic",
    popular: false,
  },
  {
    id: "standard",
    tag: "Grows with you",
    icon: BarChart2,
    name: "Standard",
    desc: "Dynamically coded with admin panel & basic SEO power.",
    price: "800",
    currency: "€",
    features: [
      "Self-serve admin panel",
      "Dynamic content & blog",
      "Basic SEO strategy",
      "Up to 10 sections",
      "Analytics & lead capture",
    ],
    cta: "Choose Standard",
    popular: false,
  },
  {
    id: "corporate",
    tag: "Most Popular",
    icon: Briefcase,
    name: "Corporate",
    desc: "Chatbot, AI integration & aggressive SEO. Sells 24/7.",
    price: "1,000",
    currency: "€",
    features: [
      "AI chatbot with your knowledge",
      "GPT/Claude API integration",
      "Aggressive SEO + content strategy",
      "CRM & email automations",
      "Multilingual ready",
    ],
    cta: "Book Corporate",
    popular: true,
  },
  {
    id: "award",
    tag: "The statement",
    icon: Crown,
    name: "Award-winning",
    desc: "Insane 3D animations, every AI API, Awwwards-tier.",
    price: "2,000",
    currency: "€",
    features: [
      "WebGL & 3D hero scenes",
      "All relevant AI APIs wired",
      "Premium motion design",
      "A/B testing & CRO",
      "Awwwards-ready",
    ],
    cta: "Build Awesome",
    popular: false,
  },
];

function Modal({ plan, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", website: "", message: "", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!plan) return null;

  const handle = (e) => { setForm((p) => ({ ...p, [e.target.name]: e.target.value })); setError(""); };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) { setError("Email is required."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Icon = plan.icon;

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
        .modal-wrap {
          animation: modal-in 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
          width: 100%;
          max-width: min(900px, 95vw);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--color-border);
          box-shadow: 0 48px 96px rgba(0,0,0,0.4);
          background-color: var(--color-card);
          display: flex;
          flex-direction: row;
          max-height: 90vh;
        }
        /* Left panel: shown on md+, hidden on mobile */
        .modal-left {
          display: none;
        }
        /* Right panel: full width on mobile */
        .modal-right {
          flex: 1;
          min-width: 0;
          overflow-y: auto;
        }
        /* Mobile: modal takes more screen height, close btn inside form */
        .modal-close-mobile {
          display: flex;
        }
        .modal-close-desktop {
          display: none;
        }
        /* 2-col form grids collapse to 1 on mobile */
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .modal-left {
            display: flex;
            width: 300px;
            flex-shrink: 0;
            background-color: var(--color-brand);
            padding: 2.5rem 2rem;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
          }
          .modal-close-mobile {
            display: none;
          }
          .modal-close-desktop {
            display: flex;
          }
          .form-grid-2 {
            grid-template-columns: 1fr 1fr;
          }
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

      <div className="modal-wrap">

        <div className="modal-left">
          
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
              className="modal-close-desktop"
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
              <Icon size={12} color="#09090b" />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#09090b", letterSpacing: ".06em", textTransform: "uppercase" }}>
                {plan.tag}
              </span>
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#09090b", margin: "0 0 8px", lineHeight: 1.15 }}>
              {plan.name}
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(9,9,11,0.65)", margin: "0 0 2rem", lineHeight: 1.6 }}>
              {plan.desc}
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "48px", fontWeight: 900, color: "#09090b", lineHeight: 1 }}>{plan.price}</span>
                <span style={{ fontSize: "18px", fontWeight: 600, color: "rgba(9,9,11,0.5)" }}>{plan.currency}</span>
              </div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {plan.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{
                    width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                    backgroundColor: "rgba(9,9,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Check size={9} strokeWidth={3} color="#09090b" />
                  </div>
                  <span style={{ fontSize: "13px", color: "rgba(9,9,11,0.75)", lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <p style={{ fontSize: "12px", color: "rgba(9,9,11,0.4)", margin: 0, marginTop: "2rem", position: "relative", zIndex: 1 }}>
            No commitment. Cancel anytime.
          </p>
        </div>

        <div className="modal-right">
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "3rem 2.5rem", textAlign: "center", gap: "1.25rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={24} color="#09090b" strokeWidth={3} />
              </div>
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-text-primary)", margin: "0 0 8px" }}>You're all set!</h3>
                <p style={{ fontSize: "14px", color: "var(--color-muted)", margin: 0 }}>
                  We'll reach out about your <span style={{ color: "var(--color-brand)", fontWeight: 600 }}>{plan.name}</span> project shortly.
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
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Book a call</h3>
                  <p style={{ fontSize: "13px", color: "var(--color-muted)", margin: 0 }}>Fill in your details and we'll get back within 24h.</p>
                </div>
                {/* Close btn — mobile only */}
                <button
                  type="button"
                  onClick={onClose}
                  className="modal-close-mobile"
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

              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {lbl("Email", true)}
                {inputWrap(<Mail size={15} />, <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@company.com" style={inputBase} />)}
                {error && <span style={{ fontSize: "12px", color: "var(--color-brand)", fontWeight: 500 }}>{error}</span>}
              </div>

              <div className="form-grid-2">
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {lbl("Name")}
                  {inputWrap(<User size={15} />, <input type="text" name="name" value={form.name} onChange={handle} placeholder="John Doe" style={inputBase} />)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {lbl("Phone")}
                  {inputWrap(<Phone size={15} />, <input type="tel" name="phone" value={form.phone} onChange={handle} placeholder="+1 234 567" style={inputBase} />)}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {lbl("Website")}
                {inputWrap(<Globe size={15} />, <input type="url" name="website" value={form.website} onChange={handle} placeholder="https://yoursite.com" style={inputBase} />)}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {lbl("Preferred slot")}
                <div className="form-grid-2">
                  {inputWrap(<Calendar size={15} />, <input type="date" name="date" value={form.date} onChange={handle} style={{ ...inputBase, fontSize: "13px" }} />)}
                  {inputWrap(<Clock size={15} />, <input type="time" name="time" value={form.time} onChange={handle} style={{ ...inputBase, fontSize: "13px" }} />)}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {lbl("Message")}
                <div style={{ border: "1px solid var(--color-border)", borderRadius: "10px", padding: "10px 12px", backgroundColor: "var(--color-secondary)" }}>
                  <textarea name="message" value={form.message} onChange={handle} rows={3}
                    placeholder="Tell us about your project…"
                    style={{ border: "none", background: "transparent", outline: "none", fontSize: "14px", color: "var(--color-text-primary)", width: "100%", resize: "none", lineHeight: "1.6", minHeight: "72px" }}
                  />
                </div>
              </div>

              <button type="submit" className="shimmer-btn" disabled={loading} style={{
                position: "relative", overflow: "hidden",
                width: "100%", height: "46px", borderRadius: "10px", border: "none",
                backgroundColor: "var(--color-brand)", color: "#09090b",
                fontSize: "14px", fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}>
                <Send size={15} />
                {loading ? "Sending…" : "Send request"}
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

export default function PricingSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="pricing" className="w-full px-6 mt-[clamp(80px,12vw,350px)]" style={{ backgroundColor: "var(--color-background)" }}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const hot = plan.popular;

          return (
            <div
              key={plan.id}
              className="relative flex flex-col rounded-2xl overflow-hidden"
              style={{
                backgroundColor: hot ? "var(--color-brand)" : "var(--color-card)",
                border: `1px solid ${hot ? "transparent" : "var(--color-border)"}`,
              }}
            >
              {hot && (
                <div className="w-full py-2 text-center" style={{ backgroundColor: "#09090b" }}>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-brand)" }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex flex-col flex-1 p-7 gap-7">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: hot ? "#09090b99" : "var(--color-muted)" }}>
                      {plan.tag}
                    </span>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: hot ? "#09090b15" : "var(--color-secondary)" }}>
                      <Icon size={16} color={hot ? "#09090b" : "var(--color-brand)"} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold tracking-tight" style={{ color: hot ? "#09090b" : "var(--color-text-primary)" }}>
                      {plan.name}
                    </h3>
                    <p className="text-sm mt-1.5 leading-relaxed" style={{ color: hot ? "#09090baa" : "var(--color-muted)" }}>
                      {plan.desc}
                    </p>
                  </div>

                  <div style={{ borderTop: `1px solid ${hot ? "#09090b15" : "var(--color-border)"}`, paddingTop: "1.25rem" }}>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold tracking-tighter leading-none" style={{ color: hot ? "#09090b" : "var(--color-text-primary)" }}>
                        {plan.price}
                      </span>
                      <span className="text-lg font-semibold" style={{ color: hot ? "#09090b99" : "var(--color-muted)" }}>
                        {plan.currency}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0" style={{ backgroundColor: hot ? "#09090b15" : "var(--color-secondary)" }}>
                        <Check size={10} strokeWidth={3} color={hot ? "#09090b" : "var(--color-brand)"} />
                      </div>
                      <span className="text-sm leading-snug" style={{ color: hot ? "#09090b" : "var(--color-foreground)" }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelected(plan)}
                  className="w-full rounded-xl py-3.5 font-bold text-sm tracking-wide hover:opacity-85 transition-opacity cursor-pointer"
                  style={
                    hot
                      ? { backgroundColor: "#09090b", color: "var(--color-brand)" }
                      : { backgroundColor: "var(--color-brand)", color: "#09090b" }
                  }
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal plan={selected} onClose={() => setSelected(null)} />
    </section>
  );
}