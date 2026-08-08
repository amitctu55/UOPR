"use client";

import Link from "next/link";
import {
  Activity, ArrowRight, CalendarDays, FileHeart, Moon, Receipt, ShieldCheck, Sun, Video,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/theme-store";

const partners = ["Northshore Medical", "Harbor Clinics", "Summit Mutual", "BlueCare Plus", "MediLink Labs", "CareBridge Network"];
const features = [
  { title: "Care coordination", description: "Appointments, reminders, and video visits orchestrated across roles without duplicate data entry.", icon: CalendarDays },
  { title: "Living EHR", description: "SOAP notes, vitals, allergies, and labs that stay synchronized for every clinician at the bedside.", icon: FileHeart },
  { title: "Telemedicine that stays clinical", description: "Video, chat, screen share, and file exchange in a room designed for clinical workflows.", icon: Video },
  { title: "Billing with clarity", description: "Invoices, insurance claims, and payment history patients and admins can actually follow.", icon: Receipt },
  { title: "Operations insight", description: "Real-time department load, staffing, and system health — before issues become incidents.", icon: Activity },
  { title: "Security by default", description: "JWT sessions, RBAC, MFA, and audit trails that satisfy compliance without slowing care.", icon: ShieldCheck },
];
const testimonials = [
  { quote: "UPCHAR replaced three disconnected tools. Our clinicians spend less time clicking and more time with patients.", name: "Priya Nair", role: "Hospital Administrator, Northshore Medical" },
  { quote: "The telemedicine room feels purpose-built — stable video, chart context, and prescribing without tab chaos.", name: "Dr. Marcus Webb", role: "Cardiologist" },
  { quote: "I finally understand my appointments, bills, and messages in one calm place.", name: "Amelia Chen", role: "Patient" },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="container-page flex h-18 items-center justify-between py-4">
          <BrandMark />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Marketing">
            <a href="#features" className="text-body-sm font-medium text-ink-muted hover:text-ink">Features</a>
            <a href="#stories" className="text-body-sm font-medium text-ink-muted hover:text-ink">Stories</a>
            <a href="#cta" className="text-body-sm font-medium text-ink-muted hover:text-ink">Get started</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Link href="/login" className="hidden sm:inline-flex"><Button variant="ghost">Log in</Button></Link>
            <Link href="/register"><Button>Get started</Button></Link>
          </div>
        </div>
      </header>

      <section className="relative min-h-[100svh] overflow-hidden" style={{ background: "var(--hero-glow)" }}>
        <div className="pointer-events-none absolute inset-0 grid-atmosphere opacity-60" aria-hidden />
        <div className="pointer-events-none absolute -right-24 top-24 h-[28rem] w-[28rem] animate-float rounded-full bg-brand-300/25 blur-3xl" />
        <div className="container-page relative flex min-h-[100svh] flex-col justify-center pb-20 pt-28">
          <p className="animate-fade-up font-display text-display-xl text-brand-700 dark:text-brand-500 sm:text-[4.25rem]">UPCHAR</p>
          <h1 className="mt-4 max-w-2xl animate-fade-up animation-delay-100 font-display text-display-md text-ink text-balance sm:text-display-lg">
            Care coordination that feels human — and scales.
          </h1>
          <p className="mt-5 max-w-xl animate-fade-up animation-delay-200 text-body-lg text-ink-muted">
            One secure platform for appointments, EHR, telemedicine, and billing — built for patients, clinicians, hospitals, and operators.
          </p>
          <div className="mt-8 flex animate-fade-up animation-delay-300 flex-wrap items-center gap-3">
            <Link href="/register"><Button size="lg">Start free trial <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link href="/login"><Button size="lg" variant="secondary">Log in</Button></Link>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block" aria-hidden>
            <svg className="absolute inset-0 h-full w-full opacity-90" viewBox="0 0 600 800" fill="none">
              <defs><linearGradient id="pulse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0c8f86" stopOpacity="0.9" /><stop offset="100%" stopColor="#2a9d7a" stopOpacity="0.4" /></linearGradient></defs>
              <path d="M40 420 H160 L200 280 L260 520 L310 360 L360 400 H560" stroke="url(#pulse)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse-soft" />
              <circle cx="420" cy="220" r="90" stroke="#0c6b6b" strokeOpacity="0.2" strokeWidth="1.5" />
              <circle cx="420" cy="220" r="55" stroke="#0c8f86" strokeOpacity="0.35" strokeWidth="1.5" />
              <circle cx="420" cy="220" r="8" fill="#0c8f86" className="animate-pulse-soft" />
            </svg>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-raised py-10">
        <div className="container-page">
          <p className="mb-6 text-center text-label text-ink-soft">Trusted across care networks</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {partners.map((p) => <span key={p} className="font-display text-body-md font-semibold tracking-tight text-ink-soft/80">{p}</span>)}
          </div>
        </div>
      </section>

      <section id="features" className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-display-md text-ink">Everything care teams need — without the clutter</h2>
            <p className="mt-3 text-body-lg text-ink-muted">Six tightly integrated modules. One visual language. Built for trust.</p>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <article key={f.title} className="group animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-300 group-hover:scale-110 dark:bg-brand-100">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-heading-sm text-ink">{f.title}</h3>
                  <p className="mt-2 text-body-md text-ink-muted">{f.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="stories" className="section-pad bg-surface-raised">
        <div className="container-page">
          <h2 className="font-display text-display-md text-ink">Voices from the network</h2>
          <p className="mt-2 max-w-xl text-body-lg text-ink-muted">Administrators, clinicians, and patients on a calmer operating rhythm.</p>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="border-l-2 border-brand-400 pl-5">
                <p className="text-body-lg text-ink">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-body-sm text-ink-soft">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="section-pad relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-800" />
        <div className="container-page relative text-center">
          <h2 className="font-display text-display-md text-white">Ready for care that stays coordinated?</h2>
          <p className="mx-auto mt-3 max-w-lg text-body-lg text-white/80">Spin up a role-based workspace in minutes. MFA, RBAC, and audit trails included.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register"><Button size="lg" className="bg-white text-brand-800 hover:bg-brand-50">Create account</Button></Link>
            <Link href="/login"><Button size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Log in to demo</Button></Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-10">
        <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <BrandMark />
          <p className="text-body-sm text-ink-soft">© {new Date().getFullYear()} UPCHAR. Built for trustworthy care.</p>
        </div>
      </footer>
    </div>
  );
}
