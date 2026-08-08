import { BrandMark } from "@/components/brand-mark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--hero-glow)" }}>
      <div className="pointer-events-none absolute inset-0 grid-atmosphere opacity-50" aria-hidden />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
        <div className="mb-8 flex justify-center"><BrandMark /></div>
        <div className="rounded-3xl border border-line bg-surface-raised/95 p-6 shadow-soft backdrop-blur-sm sm:p-8">{children}</div>
      </div>
    </div>
  );
}
