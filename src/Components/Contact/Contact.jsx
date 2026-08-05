import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { usePageContext } from "../../Context/PageContext";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

// ── Sub-components ─────────────────────────────────────────────────────────

function ContactCard({ icon: Icon, label, value, href, gold = "#C8A96A" }) {
  return (
    <a
      href={href || "#"}
      className="group flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      <span
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${gold}18` }}
      >
        <Icon size={20} style={{ color: gold }} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-800 group-hover:text-amber-700 transition-colors">
          {value}
        </p>
      </div>
      <ChevronRight
        size={16}
        className="ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400"
      />
    </a>
  );
}

function SocialButton({ icon: Icon, label, href, color }) {
  return (
    <a
      href={href || "#"}
      aria-label={label}
      className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 hover:border-transparent hover:scale-110 transition-all duration-300"
      style={{ "--hover-bg": color }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = color;
        e.currentTarget.style.borderColor = color;
        e.currentTarget.querySelector("svg").style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "";
        e.currentTarget.style.borderColor = "";
        e.currentTarget.querySelector("svg").style.color = "";
      }}
    >
      <Icon size={18} className="text-gray-500 transition-colors duration-300" />
    </a>
  );
}

function InputField({ label, type = "text", placeholder, value, onChange, name, rows, gold = "#C8A96A" }) {
  const shared =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        {label}
      </label>
      {rows ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${shared} resize-none`}
          style={{ "--tw-ring-color": gold }}
          onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${gold}55`)}
          onBlur={(e) => (e.target.style.boxShadow = "")}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={shared}
          onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${gold}55`)}
          onBlur={(e) => (e.target.style.boxShadow = "")}
        />
      )}
    </div>
  );
}

function MapCard({ mapLabel, mapCity, mapCountry, mapLink, gold = "#C8A96A" }) {
  return (
    <div className="mt-5 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Stylised static map placeholder */}
      <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        {/* Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Road lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#cbd5e1" strokeWidth="6" />
          <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#cbd5e1" strokeWidth="4" />
          <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#cbd5e1" strokeWidth="3" />
        </svg>
        {/* Pin */}
        <div className="relative z-10 flex flex-col items-center gap-1">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: gold }}
          >
            <MapPin size={22} className="text-white" />
          </div>
          <span className="bg-white text-xs font-semibold text-gray-700 px-3 py-1 rounded-full shadow-md">
            {mapLabel}
          </span>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between bg-white">
        <div>
          <p className="text-xs font-bold text-gray-700">{mapCity}</p>
          <p className="text-xs text-gray-400">{mapCountry}</p>
        </div>
        <a
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:opacity-90"
          style={{ background: `${gold}18`, color: "#92740A" }}
        >
          Get Directions
        </a>
      </div>
    </div>
  );
}

// ── Main Section ───────────────────────────────────────────────────────────

export default function HotelContactSection({ data: propData = {} }) {
  const { pagesData } = usePageContext();
  const ctxData = pagesData?.contact || {};
  // propData wins over context
  const d = { ...ctxData, ...propData };
  const gold = d.accentColor || "#C8A96A";
  const navy = "#1F2937";

  // Build initial form state dynamically from formFields
  const fields = Array.isArray(d.formFields) && d.formFields.length > 0
    ? d.formFields
    : [
        { id: 'ff-1', label: 'Full Name',     name: 'fullName', type: 'text',     placeholder: 'John Doe',            required: true,  rows: null },
        { id: 'ff-2', label: 'Email Address', name: 'email',    type: 'email',    placeholder: 'john@example.com',    required: true,  rows: null },
        { id: 'ff-3', label: 'Phone Number',  name: 'phone',    type: 'tel',      placeholder: '+880 1234-567890',    required: false, rows: null },
        { id: 'ff-4', label: 'Your Message',  name: 'message',  type: 'textarea', placeholder: 'How can we help you?',required: true,  rows: 4    },
      ];

  const emptyForm = () => Object.fromEntries(fields.map((f) => [f.name, '']));

  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const errs = {};
    fields.forEach((f) => {
      if (f.required && !form[f.name]?.trim()) {
        errs[f.name] = `${f.label} is required.`;
      }
    });
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm(emptyForm());
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  }

  return (
    <section
      id="contact"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: d.sectionBg || "linear-gradient(135deg, #f9f7f4 0%, #ffffff 60%, #f3f0ec 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: gold }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: navy }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
          <span className="h-px w-8" style={{ background: gold }} />
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: gold }}
          >
            {d.badgeText || "Reach Out"}
          </span>
          <span className="h-px w-8" style={{ background: gold }} />
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left Column ── */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-3"
              style={{ color: navy, fontFamily: "'Georgia', serif" }}
            >
              {d.heading || "Contact"} <span style={{ color: gold }}>{d.headingHighlight || "Us"}</span>
            </h2>
            <p className="text-lg font-medium text-gray-500 mb-4">
              {d.subheading || "We're here to assist you 24/7"}
            </p>
            <p className="text-sm leading-relaxed text-gray-500 mb-8 max-w-sm">
              {d.description}
            </p>

            {/* Contact cards */}
            <div className="flex flex-col gap-3 mb-8">
              {d.phone && (
                <ContactCard icon={Phone} label="Phone" value={d.phone} href={`tel:${(d.phone).replace(/\s|-/g, "")}`} gold={gold} />
              )}
              {d.email && (
                <ContactCard icon={Mail} label="Email" value={d.email} href={`mailto:${d.email}`} gold={gold} />
              )}
              {d.address && (
                <ContactCard icon={MapPin} label="Address" value={d.address} gold={gold} />
              )}
            </div>

            {/* Social links */}
            {(d.showFacebook || d.showInstagram || d.showWhatsapp) && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Follow &amp; Connect
                </p>
                <div className="flex items-center gap-3">
                  {d.showFacebook && (
                    <SocialButton icon={FaFacebookF} label="Facebook" href={d.facebookUrl} color="#1877F2" />
                  )}
                  {d.showInstagram && (
                    <SocialButton icon={FaInstagram} label="Instagram" href={d.instagramUrl} color="#E1306C" />
                  )}
                  {d.showWhatsapp && (
                    <SocialButton icon={MessageCircle} label="WhatsApp" href={d.whatsappUrl} color="#25D366" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Right Column ── */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.25s", animationFillMode: "both" }}
          >
            <div className="bg-white rounded-3xl p-7 md:p-9 shadow-xl shadow-gray-200/60 border border-gray-100">
              {/* Form header */}
              <div className="mb-6">
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: navy, fontFamily: "'Georgia', serif" }}
                >
                  {d.formTitle || "Send a Message"}
                </h3>
                <p className="text-sm text-gray-400">{d.formSubtitle || "We'll reply within a few hours."}</p>
              </div>

              {/* Success banner */}
              {sent && (
                <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                  <CheckCircle size={18} />
                  Your message has been sent — we'll be in touch shortly!
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {fields.map((field) => (
                  <div key={field.id} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      {field.label}
                      {field.required && <span className="text-rose-400 ml-1">*</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        value={form[field.name] || ''}
                        onChange={handleChange}
                        rows={field.rows || 4}
                        required={field.required}
                        className="w-full px-4 py-3 rounded-xl border bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                        style={{
                          borderColor: errors[field.name] ? '#f87171' : '#e5e7eb',
                          boxShadow: errors[field.name] ? '0 0 0 2px #fca5a555' : '',
                        }}
                        onFocus={(e) => { if (!errors[field.name]) e.target.style.boxShadow = `0 0 0 2px ${gold}55`; }}
                        onBlur={(e) => { if (!errors[field.name]) e.target.style.boxShadow = ''; }}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={form[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-3 rounded-xl border bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                        style={{ borderColor: errors[field.name] ? '#f87171' : '#e5e7eb' }}
                        onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${gold}55`)}
                        onBlur={(e) => (e.target.style.boxShadow = '')}
                      >
                        <option value="">{field.placeholder || `Select ${field.label}…`}</option>
                        {Array.isArray(field.options) && field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type || 'text'}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={form[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-3 rounded-xl border bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                        style={{
                          borderColor: errors[field.name] ? '#f87171' : '#e5e7eb',
                          boxShadow: errors[field.name] ? '0 0 0 2px #fca5a555' : '',
                        }}
                        onFocus={(e) => { if (!errors[field.name]) e.target.style.boxShadow = `0 0 0 2px ${gold}55`; }}
                        onBlur={(e) => { if (!errors[field.name]) e.target.style.boxShadow = ''; }}
                      />
                    )}

                    {errors[field.name] && (
                      <p className="text-xs text-rose-500 mt-0.5">{errors[field.name]}</p>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: loading
                      ? `${gold}99`
                      : `linear-gradient(135deg, #D4A847 0%, ${gold} 100%)`,
                    color: "#fff",
                    boxShadow: loading ? "none" : `0 6px 20px ${gold}55`,
                  }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {d.buttonText || "Send Message"}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map card */}
            <MapCard
              mapLabel={d.mapLabel || "Hotel Grand Dhaka"}
              mapCity={d.mapCity || "Gulshan-2, Dhaka"}
              mapCountry={d.mapCountry || "Bangladesh — Open 24 / 7"}
              mapLink={d.mapLink || "https://maps.google.com"}
              gold={gold}
            />
          </div>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.65s cubic-bezier(.22,.68,0,1.2) both;
        }
      `}</style>
    </section>
  );
}