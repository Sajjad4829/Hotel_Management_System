import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  CheckCircle2,
  Send,
  ArrowUp,
  Hotel
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter
} from "react-icons/fa";
/* -------------------------------------------------------------------------- */
/*  STATIC DATA                                                                 */
/* -------------------------------------------------------------------------- */

const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaTwitter, label: "Twitter / X", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
];

const QUICK_LINKS = [
  { label: "Home", href: "#" },
  { label: "Rooms", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Services", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Contact", href: "#" },
];

const CONTACT_INFO = [
  { icon: Phone, text: "+1 (555) 234-5678" },
  { icon: Mail, text: "reservations@grandhorizon.com" },
  { icon: MapPin, text: "123 Ocean Drive, Miami, FL 33139" },
  { icon: Clock, text: "24/7 Front Desk Support" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

/* -------------------------------------------------------------------------- */
/*  REUSABLE COMPONENTS                                                        */
/* -------------------------------------------------------------------------- */

function SocialIcon({ icon: Icon, label, href }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="
        group flex h-10 w-10 items-center justify-center rounded-full
        border border-[#C8A96A]/30 bg-white text-[#1F2937]
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-110 hover:border-[#C8A96A]
        hover:bg-[#C8A96A] hover:text-white hover:shadow-lg hover:shadow-[#C8A96A]/30
      "
    >
      <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
    </a>
  );
}

function FooterHeading({ children }) {
  return (
    <h3 className="font-['Playfair_Display',serif] text-lg font-semibold tracking-wide text-[#1F2937]">
      {children}
      <span className="mt-2 block h-[2px] w-8 rounded-full bg-gradient-to-r from-[#C8A96A] to-[#e9d6ab]" />
    </h3>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="
          group relative inline-block text-sm text-[#1F2937]/70
          transition-colors duration-300 hover:text-[#C8A96A]
        "
      >
        {children}
        <span
          className="
            absolute bottom-0 left-0 h-[1px] w-0 bg-[#C8A96A]
            transition-all duration-300 ease-out group-hover:w-full
          "
        />
      </a>
    </li>
  );
}

function ContactItem({ icon: Icon, text }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="
          mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full
          bg-[#C8A96A]/10 text-[#C8A96A]
          transition-colors duration-300 group-hover:bg-[#C8A96A] group-hover:text-white
        "
      >
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <span className="pt-1.5 text-sm leading-relaxed text-[#1F2937]/70">{text}</span>
    </li>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    // reset after a while so the form can be used again
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div>
      <p className="mt-3 text-sm leading-relaxed text-[#1F2937]/65">
        Subscribe to receive exclusive offers, seasonal packages, and the latest
        news from Grand Horizon Hotel.
      </p>

      {subscribed ? (
        <div
          className="
            mt-5 flex items-center gap-2 rounded-xl border border-[#C8A96A]/30
            bg-[#C8A96A]/10 px-4 py-3 text-sm font-medium text-[#1F2937]
            animate-fade-in
          "
        >
          <CheckCircle2 className="h-5 w-5 text-[#C8A96A]" strokeWidth={1.75} />
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="
              w-full rounded-xl border border-[#1F2937]/10 bg-white px-4 py-2.5
              text-sm text-[#1F2937] placeholder:text-[#1F2937]/40
              shadow-sm outline-none transition-all duration-300
              focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/30
            "
          />
          <button
            type="submit"
            className="
              flex items-center justify-center gap-2 whitespace-nowrap rounded-xl
              bg-gradient-to-r from-[#C8A96A] to-[#dcc18c] px-5 py-2.5
              text-sm font-semibold text-white shadow-md shadow-[#C8A96A]/30
              transition-all duration-300 hover:-translate-y-0.5
              hover:shadow-lg hover:shadow-[#C8A96A]/40
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] focus-visible:ring-offset-2
            "
          >
            Subscribe
            <Send className="h-4 w-4" strokeWidth={2} />
          </button>
        </form>
      )}
    </div>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center
        rounded-full border border-[#C8A96A]/30 bg-white/80 text-[#1F2937]
        shadow-lg shadow-[#1F2937]/10 backdrop-blur-md
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:bg-[#C8A96A] hover:text-white hover:shadow-[#C8A96A]/40
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  FOOTER                                                                      */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#e5efff] bg-white">
      {/* local keyframes for fade-in */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out both; }
        .animate-fade-in-1 { animation: fadeIn 0.6s ease-out 0.05s both; }
        .animate-fade-in-2 { animation: fadeIn 0.6s ease-out 0.15s both; }
        .animate-fade-in-3 { animation: fadeIn 0.6s ease-out 0.25s both; }
        .animate-fade-in-4 { animation: fadeIn 0.6s ease-out 0.35s both; }
      `}</style>

      {/* subtle decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-[#C8A96A]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[#1F2937]/5 blur-3xl"
      />

      {/* gradient backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#f5f9ff] to-white" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Column 1: Brand */}
          <div className="animate-fade-in-1 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-12 w-12 items-center justify-center rounded-xl
                  bg-gradient-to-br from-[#1F2937] to-[#374151] text-[#C8A96A]
                  shadow-md
                "
              >
                <Hotel className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <span className="font-['Playfair_Display',serif] text-xl font-semibold text-[#1F2937]">
                Grand Horizon Hotel
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[#1F2937]/65">
              Experience luxury, comfort, and unforgettable hospitality with
              world-class service.
            </p>

            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="animate-fade-in-2 flex flex-col gap-5">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="animate-fade-in-3 flex flex-col gap-5">
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="group flex flex-col gap-4">
              {CONTACT_INFO.map((item) => (
                <ContactItem key={item.text} {...item} />
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="animate-fade-in-4 flex flex-col gap-2">
            <FooterHeading>Stay Updated</FooterHeading>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 border-t border-[#e5efff] pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-[#1F2937]/60">
              © 2025 Grand Horizon Hotel. All Rights Reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="
                    relative text-[#1F2937]/60 transition-colors duration-300
                    hover:text-[#C8A96A]
                  "
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p className="flex items-center gap-1 text-sm text-[#1F2937]/60">
              Designed with <span className="text-[#C8A96A]">❤</span>
            </p>
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </footer>
  );
}