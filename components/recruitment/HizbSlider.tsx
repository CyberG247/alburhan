'use client'

import React from 'react'
import { BookOpen, Sparkles, Award, CheckCircle2, ChevronRight, Plus, Minus } from 'lucide-react'

interface HizbSliderProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function HizbSlider({ value, onChange, disabled = false }: HizbSliderProps) {
  const percentage = Math.round((value / 60) * 100)

  const getMilestoneInfo = (hizb: number) => {
    if (hizb === 60) {
      return {
        label: 'Khatm al-Qur’an (ختم القرآن كاملًا)',
        badge: 'Khatm (60 Hizbs)',
        tierColor: 'bg-amber-500 text-white border-amber-600',
        desc: 'Complete memorization of the Holy Qur’an (Full 30 Ajza’ / 60 Ahzab)',
      }
    }
    if (hizb >= 45) {
      return {
        label: 'Thalathat Arba’ (ثلاثة أرباع القرآن)',
        badge: '3/4 (Three Quarters)',
        tierColor: 'bg-emerald-600 text-white border-emerald-700',
        desc: 'Over 45 Ahzab memorized (Surah Al-Baqarah to Surah Fatir/Ya-Sin)',
      }
    }
    if (hizb >= 30) {
      return {
        label: 'Nisf al-Qur’an (نصف القرآن)',
        badge: '1/2 (Half Memorized)',
        tierColor: 'bg-emerald-700 text-white border-emerald-800',
        desc: 'At least 30 Ahzab / 15 Ajza’ memorized',
      }
    }
    if (hizb >= 15) {
      return {
        label: 'Rub’ al-Qur’an (ربع القرآن)',
        badge: '1/4 (Quarter Memorized)',
        tierColor: 'bg-teal-700 text-white border-teal-800',
        desc: 'At least 15 Ahzab memorized',
      }
    }
    if (hizb > 0) {
      return {
        label: 'Ta’lim al-Awali (بداية الحفظ والتحصيل)',
        badge: 'Foundational Hifz',
        tierColor: 'bg-slate-700 text-white border-slate-800',
        desc: 'Ongoing active memorization journey',
      }
    }
    return {
      label: 'Zero Ahzab / Non-Memorizer Track',
      badge: 'Nazirah / Recitation',
      tierColor: 'bg-slate-500 text-white border-slate-600',
      desc: 'Fluent reading with Tajweed, without formal memorization',
    }
  }

  const milestone = getMilestoneInfo(value)

  const quickPresets = [
    { hizb: 0, label: '0 Hizb', tag: 'Nazirah' },
    { hizb: 15, label: '15 Hizb', tag: 'Quarter (ربع)' },
    { hizb: 30, label: '30 Hizb', tag: 'Nisf (نصف)' },
    { hizb: 45, label: '45 Hizb', tag: '3/4 (أرباع)' },
    { hizb: 60, label: '60 Hizb', tag: 'Khatm (ختم)' },
  ]

  const handleStep = (delta: number) => {
    const next = Math.max(0, Math.min(60, value + delta))
    onChange(next)
  }

  return (
    <div className="rounded-2xl border-2 border-emerald-900/20 bg-gradient-to-b from-emerald-950/[0.04] via-white to-emerald-900/[0.02] p-5 shadow-sm sm:p-7">
      {/* Header with Title and Arabic Calligraphy */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-md shadow-emerald-900/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
                Tahfeez & Hifzul Wahyain Track
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                حفظ الوحيين
              </span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0B1E3D] sm:text-2xl">
              Hizb Memorization Progress
            </h3>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="font-serif text-3xl font-extrabold tracking-tight text-[#0B1E3D] sm:text-4xl">
                {value}
              </span>
              <span className="text-base font-bold text-slate-500">/ 60</span>
              <span className="text-xs font-semibold uppercase text-emerald-800">Hizb</span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              {percentage}% of Holy Qur’an
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Milestone Card */}
      <div className="mt-5 rounded-xl border border-emerald-100 bg-white p-3.5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${milestone.tierColor}`}>
              {milestone.badge}
            </span>
            <span className="text-sm font-bold text-[#0B1E3D]">{milestone.label}</span>
          </div>
          {value === 60 && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 animate-pulse">
              <Sparkles className="h-3.5 w-3.5" /> Full Hafidh (حافظ لكتاب الله)
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-600">{milestone.desc}</p>
      </div>

      {/* Main Slider Input Controls */}
      <div className="mt-6 space-y-3">
        <div className="relative">
          <input
            id="hizb-range-slider"
            type="range"
            min={0}
            max={60}
            step={1}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-label="Hizb Memorization Progress Slider (0 to 60)"
            className="h-3.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-800 transition focus:outline-none focus:ring-4 focus:ring-emerald-600/20 disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(to right, #065F46 0%, #059669 ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`,
            }}
          />
        </div>

        {/* Precision Fine-Tuning Buttons */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={disabled || value <= 0}
              onClick={() => handleStep(-1)}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-40"
              title="Decrease by 1 Hizb"
            >
              <Minus className="h-3 w-3" /> -1 Hizb
            </button>
            <button
              type="button"
              disabled={disabled || value >= 60}
              onClick={() => handleStep(1)}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-40"
              title="Increase by 1 Hizb"
            >
              <Plus className="h-3 w-3" /> +1 Hizb
            </button>
          </div>

          <span className="text-xs text-slate-500">
            Drag slider or click presets below
          </span>
        </div>
      </div>

      {/* Milestone Markers / Quick Jump Buttons */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Curriculum Milestone Presets
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {quickPresets.map((preset) => {
            const isSelected = value === preset.hizb
            const isPassed = value >= preset.hizb && preset.hizb > 0
            return (
              <button
                key={preset.hizb}
                type="button"
                disabled={disabled}
                onClick={() => onChange(preset.hizb)}
                className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-900 shadow-xs ring-2 ring-emerald-600/30'
                    : isPassed
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-800 hover:border-emerald-400'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs font-extrabold">{preset.label}</span>
                  {isSelected && <CheckCircle2 className="h-3 w-3 text-emerald-700" />}
                </div>
                <span className="mt-0.5 text-[10px] text-slate-500">{preset.tag}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
