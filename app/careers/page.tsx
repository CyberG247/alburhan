import { PositionSelector } from '@/components/recruitment/PositionSelector'
import Link from 'next/link'
import { ShieldCheck, MapPin } from 'lucide-react'

const logoUrl =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K5gmvm7cTVsDIz6pp1Q55IbHWUfZzo.png'

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0A0A0A]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0B1E3D] px-5 py-4 text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              width={52}
              height={52}
              alt="Al-Burhan Academy official logo"
              className="rounded-full bg-white p-1 shadow-xs"
            />
            <div>
              <p className="font-serif text-lg font-bold">Al-Burhan Academy</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-300">
                Staff Recruitment Portal · Dutse Campus
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-emerald-300 sm:flex">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>New Campus Recruitment · Dutse</span>
            </div>
            <Link
              href="/"
              className="text-xs font-semibold text-slate-300 transition hover:text-white"
            >
              Back to Academy Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#0B1E3D] px-5 pb-20 pt-14 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#F3C969]">
            <MapPin className="h-3.5 w-3.5" />
            New Campus in Madobi, Dutse, Jigawa State
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Build a life of purpose, excellence and service.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Join the faculty and leadership of the <strong>New Al-Burhan Academy Campus in Madobi, Dutse, Jigawa State</strong>.
            Contribute to the formation of confident, grounded, and pious young leaders in our state-of-the-art
            facility. Explore our 12 institutional openings with on-campus accommodation, staff boarding quarters,
            and competitive emoluments.
          </p>
        </div>
      </section>

      {/* Main Position Selector & Value Proposition */}
      <section className="mx-auto -mt-8 max-w-7xl px-5 pb-16 lg:px-8">
        <PositionSelector />
      </section>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl space-y-2">
          <p className="font-semibold text-[#0B1E3D]">
            Al-Burhan Academy · New Campus in Madobi, Dutse, Jigawa State
          </p>
          <p>
            Madobi, Dutse LGA, Jigawa State, Nigeria · An Integrated Deen & Dunya Citadel of Islamic & Academic Excellence
          </p>
          <p className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} Al-Burhan Academy. All rights reserved. Equal opportunity institutional employer.
          </p>
        </div>
      </footer>
    </main>
  )
}
