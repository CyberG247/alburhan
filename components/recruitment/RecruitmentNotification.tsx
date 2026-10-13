'use client'

import Link from 'next/link'
import {
  Briefcase,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  MapPin,
  Home,
  CheckCircle2,
  Building2,
} from 'lucide-react'

export function RecruitmentNotification() {
  const highlights = [
    {
      title: '12 Institutional Positions',
      desc: 'Head Teacher, Subject Teachers (Science, Arts, Tahfeez), ICT Officer, Secretary, Matron, Security & Operations.',
      icon: Briefcase,
    },
    {
      title: 'On-Campus Accommodation',
      desc: 'Institutional staff quarters and boarding accommodation provided on-site at the new campus in Madobi, Dutse, Jigawa State.',
      icon: Home,
    },
    {
      title: 'Competitive Remuneration',
      desc: 'Attractive salary scale, prompt allowances, pension provisions, and continuous staff development.',
      icon: ShieldCheck,
    },
    {
      title: 'Integrated Deen & Dunya',
      desc: 'A prestigious citadel blending Western basic academic curriculum with elite Hifzul Wahyain scholarship.',
      icon: GraduationCap,
    },
  ]

  const featuredPositions = [
    'Head Teacher',
    'Subject Teachers (Science & Arts)',
    'Tahfeez & Qur’an Scholars',
    'ICT Officer',
    'Institutional Secretary',
    'Campus Matron',
    'Security Personnel',
  ]

  return (
    <section id="recruitment" className="relative z-20 mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#f3c969]/40 bg-gradient-to-br from-[#0b1e3d] via-[#102a52] to-[#07152d] p-7 text-white shadow-2xl sm:p-10 lg:p-12">
        {/* Ambient lighting effects */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#f3c969]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#c8102e]/15 blur-3xl" />

        {/* Top Announcement Bar */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live pulsating badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-bold tracking-wide text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              OFFICIAL VACANCY ANNOUNCEMENT
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f3c969]/30 bg-[#f3c969]/10 px-3 py-1 text-xs font-semibold text-[#f3c969]">
              <Sparkles className="h-3.5 w-3.5" />
              2026/2027 Academic Session
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-950/50 px-3 py-1 text-xs font-semibold text-sky-300">
              <Building2 className="h-3.5 w-3.5" />
              New Madobi Campus, Dutse
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-[#f3c969]" />
            <span>New Campus · Madobi, Dutse, Jigawa State</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-block rounded-lg bg-[#c8102e]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f3c969]">
              New Campus Recruitment · Dutse, Jigawa State
            </div>
            <h2 className="mt-3 font-serif text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Staff Recruitment Exercise is Now Open for the New Dutse Campus
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              The Governing Board of <strong className="text-white">Al-Burhan Academy</strong> is pleased
              to announce recruitment for its ultra-modern facility: the{' '}
              <strong className="text-[#f3c969]">New Al-Burhan Academy Campus in Madobi, Dutse, Jigawa State</strong>.
              We invite applications from devout, visionary, and qualified professionals for academic,
              administrative, and operational leadership roles.
            </p>

            {/* Quick role tags */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Openings:
              </span>
              {featuredPositions.map((role) => (
                <span
                  key={role}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200"
                >
                  {role}
                </span>
              ))}
              <span className="rounded-lg border border-[#f3c969]/30 bg-[#f3c969]/10 px-2.5 py-1 text-xs font-semibold text-[#f3c969]">
                +5 more
              </span>
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-[#f3c969]/40 hover:bg-white/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c8102e]/20 text-[#f3c969]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Button Section under the Notification */}
        <div className="relative mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Primary Action Button: Named exactly "Apply Now!" */}
            <Link
              href="/careers/apply"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#c8102e] px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-red-950/40 transition-all duration-200 hover:scale-[1.03] hover:bg-[#990f23] focus:outline-none focus:ring-4 focus:ring-red-500/30"
              id="recruitment-apply-now-btn"
            >
              <span>Apply Now!</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Secondary Action: Browse All Positions */}
            <Link
              href="/careers"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-slate-200 backdrop-blur-xs transition-all hover:border-[#f3c969]/50 hover:bg-white/10 hover:text-white"
            >
              <Briefcase className="h-4 w-4 text-[#f3c969]" />
              <span>Explore All 12 Vacancies & Requirements (Dutse Campus)</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Madobi, Dutse, Jigawa State · Free online application</span>
          </div>
        </div>
      </div>
    </section>
  )
}
