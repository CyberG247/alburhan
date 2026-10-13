'use client'

import React, { useMemo, useState } from 'react'
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Utensils,
  Home,
  HeartHandshake,
  Briefcase,
  GraduationCap,
  FileText,
  CheckCircle2,
  Sparkles,
  Info,
  Clock,
  MapPin,
  ChevronRight,
  ChevronDown,
  Filter,
} from 'lucide-react'
import {
  positions,
  departments,
  getPosition,
  uploadFieldMeta,
  type PositionSlug,
  type Department,
} from '@/types/recruitment'

interface PositionSelectorProps {
  initialPosition?: PositionSlug
}

export function PositionSelector({ initialPosition = 'teacher' }: PositionSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All')
  const [selectedSlug, setSelectedSlug] = useState<PositionSlug>(initialPosition)

  const activePosition = useMemo(() => getPosition(selectedSlug), [selectedSlug])

  // Filtered positions based on search query and selected department
  const filteredPositions = useMemo(() => {
    return positions.filter((pos) => {
      const matchesSearch =
        pos.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.qualifications.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDept = selectedDepartment === 'All' || pos.department === selectedDepartment

      return matchesSearch && matchesDept
    })
  }, [searchQuery, selectedDepartment])

  return (
    <div className="space-y-12">
      {/* 1. VALUE PROPOSITION HERO: Why Work With Al-Burhan Academy? */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-50/60 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 -mb-12 h-48 w-48 rounded-full bg-red-50/50 blur-2xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-900/10 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#0B1E3D]">
            <Sparkles className="h-3.5 w-3.5 text-[#C8102E]" />
            Human Capital & Staff Emoluments
          </div>

          <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#0B1E3D] sm:text-4xl">
            Why Work With Al-Burhan Academy?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            The New Al-Burhan Academy Campus in Madobi, Dutse, Jigawa State is an elite Deen & Dunya boarding citadel. We invest
            profoundly in our educators, operational leaders, and auxiliary staff with an institutional welfare
            ecosystem designed for dignity and spiritual fulfillment.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Value Prop 1: Competitive Emoluments */}
            <div className="group rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-[#0B1E3D]/30 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1E3D] text-[#F3C969] shadow-sm">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-[#0B1E3D]">
                Competitive Emoluments
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Attractive salary framework benchmarked against top federal standards, paired with performance
                bonuses and timely compensation.
              </p>
            </div>

            {/* Value Prop 2: Comprehensive Accommodation */}
            <div className="group rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-[#0B1E3D]/30 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1E3D] text-[#F3C969] shadow-sm">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-[#0B1E3D]">
                Comprehensive Accommodation
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Guaranteed on-campus housing provisions and secure staff residential quarters for academic and
                operational personnel.
              </p>
            </div>

            {/* Value Prop 3: Institutional Boarding */}
            <div className="group rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-[#0B1E3D]/30 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1E3D] text-[#F3C969] shadow-sm">
                <Utensils className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-[#0B1E3D]">
                Institutional Boarding
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                3-square hygienic, nourishing meals prepared daily by our campus culinary team for resident staff
                and boarding personnel.
              </p>
            </div>

            {/* Value Prop 4: Holistic Staff Welfare */}
            <div className="group rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-[#0B1E3D]/30 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1E3D] text-[#F3C969] shadow-sm">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-[#0B1E3D]">
                Holistic Staff Welfare
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Comprehensive healthcare coverage, continuous professional teacher training, Umrah incentives, and
                an upright Islamic community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC POSITION SELECTOR & PREVIEW MATRIX */}
      <section className="space-y-6">
        {/* ============================================================== */}
        {/* MOBILE VIEW ONLY: DROPDOWN MENU + CONTINUE BUTTON */}
        {/* (Displayed ONLY on mobile screens < 768px, hidden on desktop/laptop) */}
        {/* ============================================================== */}
        <div className="block md:hidden">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8102E]">
                Active Openings ({positions.length} Roles)
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                2026/2027 Cycle
              </span>
            </div>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#0B1E3D]">
              Choose the opening you wish to apply
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Select any role you are interested in from the dropdown menu below. Review the specifications and click Continue to start applying.
            </p>

            {/* Mobile Dropdown Menu */}
            <div className="mt-5">
              <label
                htmlFor="mobile-role-selector"
                className="block text-xs font-bold uppercase tracking-wider text-[#0B1E3D] mb-2"
              >
                Select the role you want to apply:
              </label>
              <div className="relative">
                <select
                  id="mobile-role-selector"
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value as PositionSlug)}
                  className="w-full appearance-none rounded-2xl border-2 border-slate-300 bg-slate-50/70 py-3.5 pl-4 pr-10 text-sm font-bold text-[#0B1E3D] shadow-2xs outline-none transition focus:border-[#0B1E3D] focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  {departments.map((dept) => (
                    <optgroup key={dept} label={dept}>
                      {positions
                        .filter((p) => p.department === dept)
                        .map((pos) => (
                          <option key={pos.slug} value={pos.slug}>
                            {pos.title}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Active Role Preview Card for Mobile */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4.5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0B1E3D] shadow-2xs border border-slate-200">
                  {activePosition.department}
                </span>
                {!activePosition.cvRequired && (
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Passport Only · CV Excluded
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#0B1E3D]">
                  {activePosition.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-3">
                  {activePosition.summary}
                </p>
              </div>

              <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-3 text-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  <GraduationCap className="h-3.5 w-3.5 text-amber-700" /> Minimum Qualifications:
                </div>
                <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-amber-950">
                  {activePosition.qualifications}
                </p>
              </div>

              <div className="pt-1 text-[11px] text-slate-500 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  Required uploads: <strong>{activePosition.requiredUploads.length} item(s)</strong>
                </span>
              </div>
            </div>

            {/* Mobile Continue Button */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <a
                href={`/careers/apply?position=${activePosition.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#C8102E] px-6 py-4 text-base font-bold text-white shadow-md shadow-red-950/20 transition hover:bg-[#990F23] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-red-500/20"
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </a>

              <p className="mt-2.5 text-center text-[11px] text-slate-400">
                Click continue to open application for <strong>{activePosition.title}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP / LAPTOP VIEW ONLY: FULL 2-COLUMN SELECTOR & PREVIEW */}
        {/* (Displayed on desktop/laptop screens >= 768px) */}
        {/* ============================================================== */}
        <div className="hidden md:block space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E]">
                  Active Openings (12 Roles)
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  2026/2027 Cycle
                </span>
              </div>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#0B1E3D] sm:text-3xl">
                Select Your Institutional Role
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose the opening you wish to apply for to preview its formal specifications and launch the adaptive
                application wizard.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, department, or keyword..."
                aria-label="Search institutional openings"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-[#0B1E3D] placeholder-slate-400 shadow-2xs outline-none transition focus:border-[#0B1E3D] focus:ring-3 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-slate-400">
              <Filter className="h-3 w-3" /> Dept:
            </span>
            <button
              type="button"
              onClick={() => setSelectedDepartment('All')}
              className={`rounded-full px-3.5 py-1.5 font-bold transition whitespace-nowrap ${
                selectedDepartment === 'All'
                  ? 'bg-[#0B1E3D] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              All Departments ({positions.length})
            </button>
            {departments.map((dept) => {
              const count = positions.filter((p) => p.department === dept).length
              const isSelected = selectedDepartment === dept
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDepartment(dept)}
                  className={`rounded-full px-3.5 py-1.5 font-bold transition whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#0B1E3D] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {dept} ({count})
                </button>
              )
            })}
          </div>

          {/* 2-Column Layout: Roles List + Active Role Preview */}
          <div className="grid gap-8 md:grid-cols-12">
            {/* Roles Selector List (7 Columns) */}
            <div className="space-y-3 md:col-span-7">
              {filteredPositions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
                  <Info className="mx-auto h-8 w-8 text-slate-400" />
                  <p className="mt-2 text-sm font-bold text-[#0B1E3D]">No matching roles found</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Try adjusting your search query or reset the department filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedDepartment('All')
                    }}
                    className="mt-4 rounded-lg bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                filteredPositions.map((pos) => {
                  const isSelected = selectedSlug === pos.slug
                  return (
                    <div
                      key={pos.slug}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedSlug(pos.slug)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedSlug(pos.slug)
                        }
                      }}
                      className={`relative cursor-pointer rounded-2xl border p-4.5 transition duration-150 ${
                        isSelected
                          ? 'border-[#0B1E3D] bg-blue-50/50 shadow-sm ring-2 ring-[#0B1E3D]/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                              {pos.department}
                            </span>
                          </div>
                          <h3 className="mt-1.5 font-serif text-lg font-bold text-[#0B1E3D]">
                            {pos.title}
                          </h3>
                          <p className="mt-1 text-xs line-clamp-2 leading-relaxed text-slate-600">
                            {pos.summary}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center">
                          {isSelected ? (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B1E3D] text-white">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-400">
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Active Role Detailed Preview Card (5 Columns Sticky) */}
            <div className="md:col-span-5">
              <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="border-b border-slate-100 pb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
                      Role Specifications
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                      Al-Burhan Staff Portal
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-[#0B1E3D]">
                    {activePosition.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {activePosition.department} · Madobi, Dutse, Jigawa State
                  </p>
                </div>

                {/* Job Description Summary */}
                <div className="mt-5 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Job Description & Scope
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                      {activePosition.summary}
                    </p>
                  </div>

                  {/* Minimum Qualifications */}
                  <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3.5">
                    <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
                      <GraduationCap className="h-3.5 w-3.5 text-amber-700" /> Minimum Qualifications
                    </h4>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-amber-950">
                      {activePosition.qualifications}
                    </p>
                  </div>

                  {/* Upload Requirements Checklist */}
                  <div>
                    <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <FileText className="h-3.5 w-3.5" /> Required Application Uploads
                    </h4>
                    <div className="mt-2 space-y-2">
                      {activePosition.requiredUploads.map((key) => {
                        const meta = uploadFieldMeta[key]
                        return (
                          <div
                            key={key}
                            className="flex items-start gap-2 rounded-lg bg-slate-50 p-2 text-xs"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0B1E3D]" />
                            <div>
                              <span className="font-bold text-[#0B1E3D]">
                                {meta?.label || key}
                              </span>
                              {meta?.description && (
                                <p className="text-[11px] text-slate-500">{meta.description}</p>
                              )}
                            </div>
                          </div>
                        )
                      })}

                      {/* Notice for Cleaner and Gardener */}
                      {!activePosition.cvRequired && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-[11px] font-medium text-emerald-800">
                          Notice: As per institutional policy, <strong>NO CV/Resume is required</strong> for{' '}
                          {activePosition.title}. Only a valid passport photograph is needed.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button: Proceed to Dynamic Recruitment Pipeline */}
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <a
                    href={`/careers/apply?position=${activePosition.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-red-950/20 transition hover:bg-[#990F23] focus:outline-none focus:ring-4 focus:ring-red-500/20"
                  >
                    Proceed to Application
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <p className="mt-3 text-center text-[11px] text-slate-500">
                    Adaptive form mounts dynamically for <strong>{activePosition.title}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
