import { RecruitmentWizard } from '@/components/recruitment/RecruitmentWizard'
import { positions, type PositionSlug } from '@/types/recruitment'
import Link from 'next/link'
import { ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react'

const logoUrl =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K5gmvm7cTVsDIz6pp1Q55IbHWUfZzo.png'

interface ApplyPageProps {
  searchParams: Promise<{ position?: string }>
}

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const params = await searchParams
  const valid = positions.some((p) => p.slug === params.position)
  const position = (valid ? params.position : 'teacher') as PositionSlug

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0A0A0A]">
      {/* Top Navigation & Institutional Crest */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B1E3D] px-5 py-3.5 text-white shadow-md print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              width={48}
              height={48}
              alt="Al-Burhan Academy official logo"
              className="rounded-full bg-white p-1 shadow-xs"
            />
            <div>
              <p className="font-serif text-base font-bold sm:text-lg">Al-Burhan Academy</p>
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
              href="/careers"
              className="inline-flex items-center gap-1 font-semibold text-slate-300 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>All Positions</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Subheader Breadcrumb & Institutional Context */}
      <div className="border-b border-slate-200 bg-white px-5 py-3 text-xs print:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-slate-500">
          <Link href="/" className="hover:text-[#0B1E3D]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/careers" className="hover:text-[#0B1E3D]">
            Careers
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-bold text-[#0B1E3D]">Application Pipeline</span>
        </div>
      </div>

      {/* Dynamic Recruitment Wizard Mount */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:py-12 lg:px-8">
        <RecruitmentWizard initialPosition={position} />
      </section>

      {/* Institutional Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white px-5 py-8 text-center text-xs text-slate-500 print:hidden">
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
