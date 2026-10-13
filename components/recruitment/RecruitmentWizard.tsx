'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  positions,
  getPosition,
  departments,
  uploadFieldMeta,
  requiresCv,
  requiresEducationSection,
  requiresTeachingSection,
  requiresEmploymentSection,
  requiresProfessionalSection,
  requiresAdminSection,
  requiresFaithAndHadithSection,
  generateApplicationReference,
  initialFormData,
  initialInstitution,
  initialEmployment,
  initialHadithTaught,
  type PositionSlug,
  type RecruitmentFormData,
  type InstitutionEntry,
  type PreviousEmploymentEntry,
  type HadithTaughtEntry,
} from '@/types/recruitment'
import {
  nigeriaStatesAndLgas,
  nigerianStatesList,
  accreditedInstitutions,
  degreesAndCertificates,
  globalNationalities,
} from '@/lib/data/nigeria-locations'
import {
  canonicalHadithBooks,
  qiraatRiwayatList,
  arabicQualificationsList,
} from '@/lib/data/hadith-books'
import {
  validatePersonalSection,
  validateEducationSection,
  validateTeachingSection,
  validateEmploymentSection,
  validateFinalDeclaration,
} from '@/lib/validations/recruitment-schema'
import { HizbSlider } from './HizbSlider'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Upload,
  FileText,
  Trash2,
  Plus,
  RotateCcw,
  Send,
  LockKeyhole,
  Briefcase,
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  ShieldCheck,
  User,
  Building,
  Calendar,
  Phone,
  MapPin,
  Check,
  ChevronDown,
  Info,
  Loader2,
  Printer,
  QrCode,
  Download,
} from 'lucide-react'

const logoUrl =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K5gmvm7cTVsDIz6pp1Q55IbHWUfZzo.png'


// ---------------------------------------------------------------------------
// PROFESSIONAL INSTITUTIONAL FORM CONTROLS
// Always styled in explicit light mode with high-contrast text & clean borders
// ---------------------------------------------------------------------------

interface FormInputProps {
  label?: string
  required?: boolean
  type?: string
  value: string | number
  onChange: (val: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  icon?: React.ReactNode
  min?: string | number
}

function FormInput({
  label,
  required,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled,
  error,
  icon,
  min,
}: FormInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          {label} {required && <span className="text-[#C8102E]">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          style={{ colorScheme: 'light' }}
          className={`w-full rounded-xl border bg-white py-3 text-sm font-medium text-slate-900 shadow-2xs outline-none transition placeholder:text-slate-400 focus:border-[#0B1E3D] focus:ring-3 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-400 ${
            icon ? 'pl-10 pr-4' : 'px-4'
          } ${error ? 'border-[#C8102E] ring-1 ring-[#C8102E]' : 'border-slate-300 hover:border-slate-400'}`}
        />
      </div>
      {error && <p className="mt-1 text-xs font-bold text-[#C8102E]">{error}</p>}
    </div>
  )
}

interface FormSelectProps {
  label?: string
  required?: boolean
  value: string | number
  onChange: (val: string) => void
  disabled?: boolean
  error?: string
  children: React.ReactNode
  placeholder?: string
}

function FormSelect({
  label,
  required,
  value,
  onChange,
  disabled,
  error,
  children,
  placeholder,
}: FormSelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          {label} {required && <span className="text-[#C8102E]">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          style={{ colorScheme: 'light' }}
          className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-900 shadow-2xs outline-none transition focus:border-[#0B1E3D] focus:ring-3 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-400 ${
            error ? 'border-[#C8102E] ring-1 ring-[#C8102E]' : 'border-slate-300 hover:border-slate-400'
          }`}
        >
          {placeholder && (
            <option value="" className="bg-white text-slate-500">
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
      </div>
      {error && <p className="mt-1 text-xs font-bold text-[#C8102E]">{error}</p>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// MASTER RECRUITMENT WIZARD COMPONENT
// ---------------------------------------------------------------------------

interface RecruitmentWizardProps {
  initialPosition: PositionSlug
}

interface StepDefinition {
  id: string
  title: string
  shortLabel: string
  category: string
}

export function RecruitmentWizard({ initialPosition }: RecruitmentWizardProps) {
  const formTopRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<RecruitmentFormData>(() => ({
    ...initialFormData,
    position: initialPosition,
  }))

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionReference, setSubmissionReference] = useState('')
  const [submissionErrors, setSubmissionErrors] = useState<string[]>([])
  const [passportPreviewUrl, setPassportPreviewUrl] = useState<string | null>(null)
  const [fileStorage, setFileStorage] = useState<Record<string, { name: string; size: number }>>({})
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const activePosition = useMemo(() => getPosition(formData.position), [formData.position])
  const isCvNeeded = useMemo(() => requiresCv(formData.position), [formData.position])

  // Dynamic step pipeline adaptation based on selected position
  const activeSteps = useMemo<StepDefinition[]>(() => {
    const slug = formData.position
    const steps: StepDefinition[] = [
      { id: 'role-overview', title: 'Position Specifications', shortLabel: 'Role', category: 'Foundation' },
      { id: 'personal-info', title: 'Personal Information', shortLabel: 'Personal', category: 'Identity' },
    ]

    if (requiresEducationSection(slug)) {
      steps.push({
        id: 'academic-qualifications',
        title: 'Education & Institutional History',
        shortLabel: 'Education',
        category: 'Academics',
      })
    }

    if (requiresTeachingSection(slug)) {
      steps.push({
        id: 'teaching-experience',
        title: slug === 'head-teacher' ? 'Teaching & Leadership Record' : 'Teaching Experience',
        shortLabel: 'Teaching',
        category: 'Pedagogy',
      })
    }

    if (requiresEmploymentSection(slug)) {
      steps.push({
        id: 'employment-record',
        title: 'Employment Record & Current Status',
        shortLabel: 'Employment',
        category: 'Career',
      })
    }

    if (requiresProfessionalSection(slug)) {
      steps.push({
        id: 'professional-research',
        title: 'Academic, Research & Language Profile',
        shortLabel: 'Professional',
        category: 'Credentials',
      })
    }

    if (requiresFaithAndHadithSection(slug)) {
      steps.push({
        id: 'faith-hifz-hadith',
        title: 'Qur’anic Hifz, Hadith & Arabic Proficiency',
        shortLabel: 'Hifzul Wahyain',
        category: 'Islamic Faculty',
      })
    }

    steps.push(
      {
        id: 'document-uploads',
        title: 'Required Uploads & Credentials',
        shortLabel: 'Uploads',
        category: 'Verification',
      },
      {
        id: 'review-attestation',
        title: 'Institutional Review & Declaration',
        shortLabel: 'Declaration',
        category: 'Submission',
      }
    )

    return steps
  }, [formData.position])

  const currentStep = activeSteps[currentStepIndex] || activeSteps[0]

  // Draft persistence via localStorage
  const DRAFT_KEY = `alburhan_recruitment_draft_${formData.position}`

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          position: initialPosition, // preserve URL-selected position
        }))
      }
    } catch {
      // ignore
    }
  }, [initialPosition, DRAFT_KEY])

  const saveDraftLocally = () => {
    try {
      setIsSavingDraft(true)
      const dataToSave = { ...formData, passportPhoto: undefined, cvFile: undefined }
      localStorage.setItem(DRAFT_KEY, JSON.stringify(dataToSave))
      setToastMessage('Application draft saved locally')
      setTimeout(() => setToastMessage(null), 3000)
    } finally {
      setIsSavingDraft(false)
    }
  }

  // Update helper
  const updateField = <K extends keyof RecruitmentFormData>(key: K, value: RecruitmentFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  // File upload handler
  const handleFileUpload = (
    fieldKey: string,
    file: File | undefined,
    isPassport: boolean = false
  ) => {
    if (!file) return

    // 100MB limit per user specification
    const maxBytes = 100 * 1024 * 1024
    if (file.size > maxBytes) {
      alert('File exceeds maximum allowed size of 100MB.')
      return
    }

    if (isPassport) {
      setFormData((prev) => ({ ...prev, passportPhoto: file }))
      const url = URL.createObjectURL(file)
      setPassportPreviewUrl(url)
    } else if (fieldKey === 'cv') {
      setFormData((prev) => ({ ...prev, cvFile: file }))
    } else {
      setFormData((prev) => ({
        ...prev,
        additionalFiles: { ...prev.additionalFiles, [fieldKey]: file },
      }))
    }

    setFileStorage((prev) => ({
      ...prev,
      [fieldKey]: { name: file.name, size: Math.round(file.size / 1024) },
    }))

    // Clear related error
    if (errors[fieldKey]) {
      setErrors((prev) => {
        const n = { ...prev }
        delete n[fieldKey]
        return n
      })
    }
    // Also remove from submission error list if present
    setSubmissionErrors((prev) => prev.filter((msg) => !msg.toLowerCase().includes(fieldKey)))
  }

  const removeFile = (fieldKey: string) => {
    if (fieldKey === 'passport') {
      setFormData((prev) => ({ ...prev, passportPhoto: undefined }))
      setPassportPreviewUrl(null)
    } else if (fieldKey === 'cv') {
      setFormData((prev) => ({ ...prev, cvFile: undefined }))
    } else {
      setFormData((prev) => {
        const copy = { ...prev.additionalFiles }
        delete copy[fieldKey]
        return { ...prev, additionalFiles: copy }
      })
    }
    setFileStorage((prev) => {
      const copy = { ...prev }
      delete copy[fieldKey]
      return copy
    })
  }

  // Repeatable Institution Helpers
  const addInstitution = () => {
    const newEntry: InstitutionEntry = {
      id: `inst-${Date.now()}`,
      institutionName: '',
      yearGraduated: '2024',
      certificateObtained: '',
      dateObtained: '',
    }
    setFormData((prev) => ({
      ...prev,
      institutionsAttended: [...prev.institutionsAttended, newEntry],
    }))
  }

  const removeInstitution = (id: string) => {
    if (formData.institutionsAttended.length <= 1) return
    setFormData((prev) => ({
      ...prev,
      institutionsAttended: prev.institutionsAttended.filter((item) => item.id !== id),
    }))
  }

  const updateInstitution = (id: string, field: keyof InstitutionEntry, val: string) => {
    setFormData((prev) => ({
      ...prev,
      institutionsAttended: prev.institutionsAttended.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }))
  }

  // Repeatable Employment History Helpers
  const addEmploymentHistory = () => {
    const newEntry: PreviousEmploymentEntry = {
      id: `emp-${Date.now()}`,
      companyName: '',
      role: '',
      startDate: '',
      endDate: '',
    }
    setFormData((prev) => ({
      ...prev,
      previousEmployments: [...prev.previousEmployments, newEntry],
    }))
  }

  const removeEmploymentHistory = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      previousEmployments: prev.previousEmployments.filter((item) => item.id !== id),
    }))
  }

  const updateEmploymentHistory = (
    id: string,
    field: keyof PreviousEmploymentEntry,
    val: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      previousEmployments: prev.previousEmployments.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }))
  }

  // Step Validation Dispatcher
  const validateCurrentStep = (): boolean => {
    let stepErrors: Record<string, string> = {}

    switch (currentStep.id) {
      case 'personal-info':
        stepErrors = validatePersonalSection(formData)
        if (!formData.passportPhoto && !fileStorage['passport']) {
          stepErrors.passport = 'Passport photograph upload is required'
        }
        break

      case 'academic-qualifications':
        stepErrors = validateEducationSection(formData, formData.position)
        break

      case 'teaching-experience':
        stepErrors = validateTeachingSection(formData, formData.position)
        break

      case 'employment-record':
        stepErrors = validateEmploymentSection(formData)
        break

      case 'document-uploads':
        if (isCvNeeded && !formData.cvFile && !fileStorage['cv']) {
          stepErrors.cv = 'Curriculum Vitae (CV) is mandatory for this position'
        }
        break

      case 'review-attestation':
        stepErrors = validateFinalDeclaration(
          formData,
          formData.position,
          Boolean(formData.cvFile || fileStorage['cv'])
        )
        break

      default:
        break
    }

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  // Navigation Handlers
  const handleNext = () => {
    const isValid = validateCurrentStep()
    if (isValid) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setCurrentStepIndex((prev) => Math.min(activeSteps.length - 1, prev + 1))
    } else {
      formTopRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStepIndex((prev) => Math.max(0, prev - 1))
  }

  // ===========================================================================
  // COMPREHENSIVE & FOOLPROOF SUBMISSION HANDLER
  // ===========================================================================
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    const detectedErrors: string[] = []

    // 1. Check legal attestation & signature
    if (!formData.attested) {
      detectedErrors.push('You must certify the Solemn Islamic and Legal Oath of truthfulness.')
    }
    if (!formData.digitalSignature || formData.digitalSignature.trim().length < 3) {
      detectedErrors.push('Please type your full legal name in the Digital Applicant Signature field.')
    }

    // 2. Check CV requirement if role requires it
    if (isCvNeeded && !formData.cvFile && !fileStorage['cv']) {
      detectedErrors.push('Curriculum Vitae (CV / Resume) is mandatory for this position. Please upload your CV below.')
    }

    // 3. Check Passport requirement
    if (!formData.passportPhoto && !fileStorage['passport']) {
      detectedErrors.push('Passport photograph is required. Please upload your passport photo.')
    }

    // 4. Check core personal details
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      detectedErrors.push('Full Legal Name is required in Section 1.')
    }
    if (!formData.phone || formData.phone.trim().length < 7) {
      detectedErrors.push('Valid Phone Number is required in Section 1.')
    }

    if (detectedErrors.length > 0) {
      setSubmissionErrors(detectedErrors)
      formTopRef.current?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    // If completely valid, submit with clear feedback
    setSubmissionErrors([])
    setIsSubmitting(true)

    setTimeout(() => {
      const reference = generateApplicationReference(formData.position)
      setSubmissionReference(reference)
      setIsSubmitted(true)
      setIsSubmitting(false)
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 600)
  }

  const handleReset = () => {
    setFormData({ ...initialFormData, position: initialPosition })
    setCurrentStepIndex(0)
    setIsSubmitted(false)
    setSubmissionReference('')
    setSubmissionErrors([])
    setFileStorage({})
    setPassportPreviewUrl(null)
  }

  const handleDownloadSlip = () => {
    const originalTitle = document.title
    document.title = `Al-Burhan-Recruitment-Slip-${submissionReference || 'Staff'}`
    window.print()
    setTimeout(() => {
      document.title = originalTitle
    }, 2000)
  }

  // ---------------------------------------------------------------------------
  // SUBMISSION SUCCESS VIEW
  // ---------------------------------------------------------------------------
  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-3xl space-y-8">
        {/* On-screen Notification & Actions Banner (hidden during print) */}
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 text-center shadow-sm sm:p-8 print:hidden">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-inner">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <span className="mt-4 inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            Application Successfully Received
          </span>

          <h1 className="mt-2 font-serif text-2xl font-bold text-[#0B1E3D] sm:text-3xl">
            Recruitment Dossier Submitted
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Your application for the post of <strong className="text-[#0B1E3D]">{activePosition.title}</strong> has
            been catalogued in the Al-Burhan Academy Human Capital Registry. Retain the official application slip below for
            physical screening and interview accreditation.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleDownloadSlip}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-red-950/20 transition hover:bg-[#990F23] focus:outline-none focus:ring-4 focus:ring-red-500/20"
            >
              <Download className="h-4 w-4" />
              Download Slip (PDF)
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0B1E3D] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#153463]"
            >
              <Printer className="h-4 w-4" />
              Print Application Slip
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Submit Another Application
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
            >
              Return to Academy Home
            </a>
          </div>
        </div>

        {/* OFFICIAL RECRUITMENT APPLICATION SLIP (Printed & On-Screen) */}
        <div
          id="recruitment-application-slip"
          className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg sm:p-10 print:m-0 print:rounded-none print:border print:p-6 print:shadow-none"
        >
          {/* Slip Action Toolbar (Hidden when printed) */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 print:hidden">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Official Verification Slip · Ready to Save
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadSlip}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#C8102E] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#990F23]"
                title="Download as PDF"
              >
                <Download className="h-3.5 w-3.5" />
                Download Slip (PDF)
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50"
                title="Print slip"
              >
                <Printer className="h-3.5 w-3.5" />
                Print
              </button>
            </div>
          </div>
          {/* Slip Header with Official Al-Burhan Academy Logo */}
          <div className="flex flex-col gap-5 border-b-2 border-[#0B1E3D] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={logoUrl}
                alt="Al-Burhan Academy official logo"
                className="h-20 w-20 shrink-0 rounded-full border border-slate-200 bg-white object-contain p-1 shadow-xs"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E]">
                    Al-Burhan Academy
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    حفظ الوحيين
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-black text-[#0B1E3D] sm:text-3xl">
                  Al-Burhan Academy
                </h2>
                <p className="text-xs font-medium text-slate-500">
                  New Al-Burhan Academy Campus, Madobi, Dutse LGA, Jigawa State
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#0B1E3D]">
                  Directorate of Human Capital · Staff Recruitment Slip (2026/2027)
                </p>
              </div>
            </div>

            {/* Passport Photograph / Verification Box */}
            <div className="flex shrink-0 items-center justify-end">
              {passportPreviewUrl ? (
                <div className="text-center">
                  <img
                    src={passportPreviewUrl}
                    alt="Applicant Passport"
                    className="h-24 w-20 rounded-lg border-2 border-slate-300 object-cover shadow-xs"
                  />
                  <span className="mt-1 block text-[9px] font-bold uppercase text-slate-500">
                    Applicant Photo
                  </span>
                </div>
              ) : (
                <div className="flex h-24 w-20 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400">
                  <User className="h-8 w-8" />
                  <span className="mt-1 text-[8px] font-bold uppercase text-center leading-tight">
                    Photo on File
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Reference Number Banner */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-900/10 bg-[#0B1E3D] px-6 py-4 text-white">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#F3C969]">
                Application Reference Code
              </p>
              <p className="font-mono text-2xl font-extrabold tracking-wider text-white sm:text-3xl">
                {submissionReference}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase text-emerald-300">
                Status: Submitted & Catalogued
              </span>
              <p className="mt-1 text-[11px] text-slate-300">
                Submission Date: {formData.signatureDate || new Date().toISOString().split('T')[0]}
              </p>
            </div>
          </div>

          {/* Application Details Grid */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {/* Position Applied */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[#0B1E3D] flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <Briefcase className="h-3.5 w-3.5 text-[#C8102E]" /> Applied Position Details
              </h3>
              <div className="space-y-1.5 text-slate-700">
                <p>
                  <strong className="text-slate-900">Designation:</strong> {activePosition.title}
                </p>
                <p>
                  <strong className="text-slate-900">Department:</strong> {activePosition.department}
                </p>
                <p>
                  <strong className="text-slate-900">Duty Station:</strong> New Campus, Madobi, Dutse, Jigawa State
                </p>
                <p>
                  <strong className="text-slate-900">Employment Type:</strong> Institutional Full-Time
                </p>
              </div>
            </div>

            {/* Applicant Bio Data */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[#0B1E3D] flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <User className="h-3.5 w-3.5 text-[#C8102E]" /> Applicant Bio-Data
              </h3>
              <div className="space-y-1.5 text-slate-700">
                <p>
                  <strong className="text-slate-900">Full Legal Name:</strong> {formData.fullName}
                </p>
                <p>
                  <strong className="text-slate-900">Gender:</strong> {formData.gender || 'Not specified'}
                </p>
                <p>
                  <strong className="text-slate-900">State / LGA:</strong>{' '}
                  {formData.lga ? `${formData.lga}, ` : ''}{formData.state} State
                </p>
                <p>
                  <strong className="text-slate-900">Telephone:</strong> {formData.phone}
                </p>
                {formData.residentialAddress && (
                  <p>
                    <strong className="text-slate-900">Address:</strong> {formData.residentialAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Qualifications & Experience */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[#0B1E3D] flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <GraduationCap className="h-3.5 w-3.5 text-[#C8102E]" /> Qualifications & Experience
              </h3>
              <div className="space-y-1.5 text-slate-700">
                <p>
                  <strong className="text-slate-900">Present Qualification:</strong>{' '}
                  {formData.presentQualification || 'Standard institutional entry'}
                </p>
                {formData.specialization && (
                  <p>
                    <strong className="text-slate-900">Specialization:</strong> {formData.specialization}
                  </p>
                )}
                {formData.totalYearsOfService && (
                  <p>
                    <strong className="text-slate-900">Years of Service:</strong>{' '}
                    {formData.totalYearsOfService} Years
                  </p>
                )}
                <p>
                  <strong className="text-slate-900">Uploaded Documents:</strong>{' '}
                  {Object.keys(fileStorage).length} file(s) attached
                </p>
              </div>
            </div>

            {/* Official Attestation & Legal Seal */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[#0B1E3D] flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C8102E]" /> Official Attestation
              </h3>
              <div className="space-y-1.5 text-slate-700">
                <p>
                  <strong className="text-slate-900">Digital Signature:</strong>{' '}
                  <span className="font-serif italic font-semibold text-[#0B1E3D]">
                    {formData.digitalSignature || formData.fullName}
                  </span>
                </p>
                <p>
                  <strong className="text-slate-900">Attestation Status:</strong> Legally Affirmed Under Oath
                </p>
                <p>
                  <strong className="text-slate-900">Signed Date:</strong>{' '}
                  {formData.signatureDate || new Date().toISOString().split('T')[0]}
                </p>
                <p className="text-[11px] text-slate-500 italic">
                  Certified electronically via Al-Burhan Staff Recruitment Portal.
                </p>
              </div>
            </div>
          </div>

          {/* Important Screening Notice */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-950 space-y-2">
            <p className="font-bold uppercase tracking-wider text-amber-900">
              Important Instructions for Physical Screening & Interview:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>
                <strong>Slip Presentation:</strong> You must present this printed slip upon arrival at the Al-Burhan Academy Main Campus for physical interview and credential verification.
              </li>
              <li>
                <strong>Original Documents:</strong> Bring original degree/diploma certificates, primary/secondary testimonials, and a valid national ID (NIN Slip, Voter Card, or Driver’s License).
              </li>
              <li>
                <strong>Campus Venue:</strong> New Al-Burhan Academy Campus, Madobi, Dutse LGA, Jigawa State.
              </li>
            </ul>
          </div>

          {/* Slip Footer / Verification Stamp */}
          <div className="mt-6 flex flex-wrap items-center justify-between border-t border-slate-200 pt-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <QrCode className="h-6 w-6 text-[#0B1E3D]" />
              <div>
                <span className="font-bold text-[#0B1E3D]">Registry Authenticated</span> · Al-Burhan Academy, Dutse Campus
              </div>
            </div>
            <div>
              Portal Reference: <span className="font-mono font-bold text-slate-700">{submissionReference}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // MAIN RECRUITMENT WIZARD RENDER
  // ---------------------------------------------------------------------------
  return (
    <div ref={formTopRef} className="mx-auto max-w-5xl space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-[#0B1E3D] px-4 py-3 text-xs font-bold text-white shadow-xl animate-fade-in">
          <Check className="h-4 w-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Top Header Card */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-blue-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B1E3D]">
              {activePosition.department}
            </span>
            <span className="rounded bg-red-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#C8102E]">
              Hiring Cycle 2026/2027
            </span>
          </div>
          <h1 className="mt-2 font-serif text-2xl font-bold text-[#0B1E3D] sm:text-3xl">
            {activePosition.title}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            New Al-Burhan Academy Campus · Madobi, Dutse, Jigawa State, Nigeria
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={saveDraftLocally}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50"
            title="Save your progress locally"
          >
            <LockKeyhole className="h-3.5 w-3.5 text-slate-500" />
            {isSavingDraft ? 'Saving...' : 'Save Draft'}
          </button>
          <a
            href="/careers"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#0B1E3D]"
          >
            Change Role
          </a>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[#0B1E3D]">
            Step {currentStepIndex + 1} of {activeSteps.length}: {currentStep.title}
          </span>
          <span className="text-slate-500">
            {Math.round(((currentStepIndex + 1) / activeSteps.length) * 100)}% Complete
          </span>
        </div>

        {/* Progress track */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-gradient-to-r from-[#0B1E3D] via-[#1E3A8A] to-[#C8102E] transition-all duration-300"
            style={{
              width: `${((currentStepIndex + 1) / activeSteps.length) * 100}%`,
            }}
          />
        </div>

        {/* Responsive Step Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 text-xs">
          {activeSteps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex
            const isCurrent = idx === currentStepIndex
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  if (idx < currentStepIndex) {
                    setCurrentStepIndex(idx)
                  }
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-bold whitespace-nowrap transition ${
                  isCurrent
                    ? 'bg-[#0B1E3D] text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isCompleted ? <Check className="h-3 w-3" /> : <span>{idx + 1}.</span>}
                {step.shortLabel}
              </button>
            )
          })}
        </div>
      </div>

      {/* Global Validation Alert Banner */}
      {submissionErrors.length > 0 && (
        <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-5 text-red-900 shadow-sm animate-shake">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />
            <div className="space-y-1.5 text-xs">
              <strong className="block text-sm font-bold text-[#C8102E]">
                Please complete the following items before submitting your application:
              </strong>
              <ul className="list-disc pl-4 space-y-1">
                {submissionErrors.map((err, i) => (
                  <li key={i} className="font-medium text-red-800">
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Form Container */}
      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        {/* ================================================================= */}
        {/* STEP 1: ROLE OVERVIEW & REQUIREMENTS */}
        {/* ================================================================= */}
        {currentStep.id === 'role-overview' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-blue-900/10 bg-gradient-to-br from-[#0B1E3D] via-[#102B54] to-[#0B1E3D] p-6 text-white sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="w-fit rounded bg-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#F3C969]">
                  Position Specification
                </span>
                <div className="flex items-center gap-2">
                  <label htmlFor="position-switch-select" className="text-xs font-medium text-slate-300">
                    Applying for:
                  </label>
                  <select
                    id="position-switch-select"
                    value={formData.position}
                    onChange={(e) => {
                      const nextSlug = e.target.value as PositionSlug
                      setFormData((prev) => ({ ...prev, position: nextSlug }))
                    }}
                    className="rounded-lg border border-white/20 bg-[#0B1E3D] px-3 py-1.5 text-xs font-semibold text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    {positions.map((p) => (
                      <option key={p.slug} value={p.slug} className="bg-[#0B1E3D] text-white">
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">
                {activePosition.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {activePosition.summary}
              </p>

              <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Department
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {activePosition.department}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Location & Housing
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    New Al-Burhan Academy Campus, Madobi, Dutse, Jigawa State
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Track Selector for Teachers */}
            {formData.position === 'teacher' && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <label className="block text-sm font-bold text-[#0B1E3D]">
                  Select Academic Faculty Track:
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-4">
                  {(['General', 'Science', 'Arts', 'Tahfeez / Hifzul Wahyain'] as const).map(
                    (track) => {
                      const isSelected = formData.teacherTrack === track
                      return (
                        <button
                          key={track}
                          type="button"
                          onClick={() => updateField('teacherTrack', track)}
                          className={`rounded-xl border p-3 text-left transition ${
                            isSelected
                              ? 'border-[#0B1E3D] bg-white ring-2 ring-[#0B1E3D]/20 shadow-xs'
                              : 'border-slate-200 bg-white/60 hover:bg-white'
                          }`}
                        >
                          <span className="text-xs font-bold text-[#0B1E3D]">{track}</span>
                          <span className="block mt-0.5 text-[11px] text-slate-500">
                            {track === 'Tahfeez / Hifzul Wahyain'
                              ? 'Qur’an & Sunnah Track'
                              : `${track} Curriculum`}
                          </span>
                        </button>
                      )
                    }
                  )}
                </div>
              </div>
            )}

            {/* Role Prerequisites & Upload Matrix */}
            <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">
              <h3 className="font-serif text-lg font-bold text-[#0B1E3D]">
                Mandatory Documentation & Upload Checklist
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                The form will dynamically prompt for the following items during the submission workflow:
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {activePosition.requiredUploads.map((key) => {
                  const meta = uploadFieldMeta[key]
                  return (
                    <div
                      key={key}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <div>
                        <p className="font-bold text-[#0B1E3D]">{meta?.label || key}</p>
                        <p className="mt-0.5 text-[11px] text-slate-500">{meta?.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {!isCvNeeded && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-900">
                  <strong>Notice for {activePosition.title}:</strong> You are exempt from submitting a CV or resume.
                  Only a clear passport photograph is required to verify identity.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 2: PERSONAL INFORMATION (ALL POSITIONS) */}
        {/* ================================================================= */}
        {currentStep.id === 'personal-info' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B1E3D]">
                Section 1: Personal Information
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Please enter your legal identity particulars as they appear on official government records.
              </p>
            </div>

            {/* Passport Photo Upload Zone */}
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {passportPreviewUrl ? (
                    <img
                      src={passportPreviewUrl}
                      alt="Passport Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-slate-300" />
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-bold text-[#0B1E3D]">
                      Upload Passport Photograph <span className="text-[#C8102E]">*</span>
                    </label>
                    <p className="text-xs text-slate-500">
                      Clear color passport photo against a plain background. JPEG or PNG (Max 100MB).
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0B1E3D] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#153463]">
                      <Upload className="h-3.5 w-3.5" />
                      Browse Passport
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        className="sr-only"
                        onChange={(e) => handleFileUpload('passport', e.target.files?.[0], true)}
                      />
                    </label>

                    {(formData.passportPhoto || fileStorage['passport']) && (
                      <button
                        type="button"
                        onClick={() => removeFile('passport')}
                        className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    )}
                  </div>

                  {errors.passport && (
                    <p className="text-xs font-bold text-[#C8102E]">{errors.passport}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FormInput
                  label="Full Legal Name (Surname, First Name, Middle Name)"
                  required
                  value={formData.fullName}
                  onChange={(v) => updateField('fullName', v)}
                  placeholder="e.g. Ibrahim Aliyu Ringim"
                  error={errors.fullName}
                />
              </div>

              <div>
                <FormInput
                  label="Phone Number (Nigeria default +234)"
                  required
                  type="tel"
                  icon={<Phone className="h-4 w-4" />}
                  value={formData.phone}
                  onChange={(v) => updateField('phone', v)}
                  placeholder="+234 803 000 0000"
                  error={errors.phone}
                />
              </div>

              <div>
                <FormInput
                  label="Date of Birth (Must be 18+ years)"
                  required
                  type="date"
                  icon={<Calendar className="h-4 w-4" />}
                  value={formData.dateOfBirth}
                  onChange={(v) => updateField('dateOfBirth', v)}
                  error={errors.dateOfBirth}
                />
              </div>

              <div>
                <FormSelect
                  label="Gender"
                  required
                  value={formData.gender}
                  onChange={(v) => updateField('gender', v as RecruitmentFormData['gender'])}
                  placeholder="Select Gender"
                  error={errors.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </FormSelect>
              </div>

              <div>
                <FormSelect
                  label="Marital Status"
                  required
                  value={formData.maritalStatus}
                  onChange={(v) =>
                    updateField('maritalStatus', v as RecruitmentFormData['maritalStatus'])
                  }
                  placeholder="Select Marital Status"
                  error={errors.maritalStatus}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </FormSelect>
              </div>

              <div className="sm:col-span-2">
                <FormInput
                  label="Residential Address (Street, Town, State)"
                  required
                  icon={<MapPin className="h-4 w-4" />}
                  value={formData.residentialAddress}
                  onChange={(v) => updateField('residentialAddress', v)}
                  placeholder="e.g. Madobi Road, Dutse, Jigawa State"
                  error={errors.residentialAddress}
                />
              </div>

              <div>
                <FormSelect
                  label="Nationality"
                  required
                  value={formData.nationality}
                  onChange={(v) => updateField('nationality', v)}
                >
                  {globalNationalities.map((nat) => (
                    <option key={nat} value={nat}>
                      {nat}
                    </option>
                  ))}
                </FormSelect>
              </div>

              <div>
                <FormSelect
                  label="State of Origin"
                  required
                  value={formData.state}
                  onChange={(newState) => {
                    const lgas = nigeriaStatesAndLgas[newState] || []
                    updateField('state', newState)
                    updateField('lga', lgas[0] || '')
                  }}
                  placeholder="Select State"
                  error={errors.state}
                >
                  {nigerianStatesList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </FormSelect>
              </div>

              <div className="sm:col-span-2">
                <FormSelect
                  label="Local Government Area (LGA) of Origin"
                  required
                  value={formData.lga}
                  onChange={(v) => updateField('lga', v)}
                  disabled={!formData.state}
                  placeholder={formData.state ? 'Select LGA' : 'Select State first'}
                  error={errors.lga}
                >
                  {(nigeriaStatesAndLgas[formData.state] || []).map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </FormSelect>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 3: EDUCATIONAL QUALIFICATIONS & REPEATABLE HISTORY */}
        {/* ================================================================= */}
        {currentStep.id === 'academic-qualifications' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B1E3D]">
                Section 2 & 4: Academic Qualifications & Institutional History
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Accredited qualifications and tertiary educational history.
              </p>
            </div>

            {/* Section 2: Highest Present Qualification & Specialization */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <FormSelect
                  label="Highest Academic Qualification Obtained"
                  required
                  value={formData.presentQualification}
                  onChange={(v) => updateField('presentQualification', v)}
                  placeholder="Select Qualification Tier"
                  error={errors.presentQualification}
                >
                  {degreesAndCertificates.map((deg) => (
                    <option key={deg} value={deg}>
                      {deg}
                    </option>
                  ))}
                </FormSelect>
              </div>

              <div>
                <FormInput
                  label="Discipline / Area of Specialization"
                  required
                  value={formData.specialization}
                  onChange={(v) => updateField('specialization', v)}
                  placeholder="e.g. Arabic & Islamic Studies, Mathematics, Computer Science"
                  error={errors.specialization}
                />
              </div>

              <div className="sm:col-span-2">
                <FormInput
                  label="Senior Secondary School Attended"
                  value={formData.seniorSecondarySchool}
                  onChange={(v) => updateField('seniorSecondarySchool', v)}
                  placeholder="e.g. Government Arabic Secondary School, Ringim"
                />
              </div>
            </div>

            {/* Section 4: Institutions Attended (Repeatable Array) */}
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0B1E3D]">
                    Tertiary Institutions Attended
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add all universities, polytechnics, and colleges of education attended.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addInstitution}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#0B1E3D] bg-blue-50/50 px-3.5 py-2 text-xs font-bold text-[#0B1E3D] hover:bg-blue-100"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Another Institution
                </button>
              </div>

              <div className="space-y-4">
                {formData.institutionsAttended.map((inst, index) => (
                  <div
                    key={inst.id}
                    className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="mb-3 flex items-center justify-between border-b border-slate-200/60 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Institution #{index + 1}
                      </span>
                      {formData.institutionsAttended.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInstitution(inst.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <FormSelect
                          label="Institution Name"
                          value={inst.institutionName}
                          onChange={(v) => updateInstitution(inst.id, 'institutionName', v)}
                          placeholder="Select Accredited Nigerian Tertiary Institution"
                        >
                          {accreditedInstitutions.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </FormSelect>
                      </div>

                      {inst.institutionName === 'Other / Foreign / Not Listed' && (
                        <div className="sm:col-span-2">
                          <FormInput
                            label="Specify Institution Name & Country"
                            value={inst.customInstitution || ''}
                            onChange={(v) => updateInstitution(inst.id, 'customInstitution', v)}
                            placeholder="e.g. Al-Azhar University, Cairo, Egypt"
                          />
                        </div>
                      )}

                      <div>
                        <FormSelect
                          label="Year Graduated"
                          value={inst.yearGraduated}
                          onChange={(v) => updateInstitution(inst.id, 'yearGraduated', v)}
                          placeholder="Select Year"
                        >
                          {Array.from({ length: 57 }, (_, i) => String(2026 - i)).map((yr) => (
                            <option key={yr} value={yr}>
                              {yr}
                            </option>
                          ))}
                        </FormSelect>
                      </div>

                      <div>
                        <FormSelect
                          label="Degree / Certificate Obtained"
                          value={inst.certificateObtained}
                          onChange={(v) =>
                            updateInstitution(inst.id, 'certificateObtained', v)
                          }
                          placeholder="Select Certificate"
                        >
                          {degreesAndCertificates.map((cert) => (
                            <option key={cert} value={cert}>
                              {cert}
                            </option>
                          ))}
                        </FormSelect>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 4: TEACHING & ADMINISTRATIVE EXPERIENCE */}
        {/* ================================================================= */}
        {currentStep.id === 'teaching-experience' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B1E3D]">
                Section 3 & 7: Teaching & Administrative Experience
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Classroom instructional pedigree and school leadership appointments.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <label className="block text-sm font-bold text-[#0B1E3D]">
                Have you ever taught in any Public or Private School? <span className="text-[#C8102E]">*</span>
              </label>

              <div className="mt-3 flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hasTaughtBefore"
                    checked={formData.hasTaughtBefore === 'Yes'}
                    onChange={() => updateField('hasTaughtBefore', 'Yes')}
                    className="h-4 w-4 text-[#0B1E3D]"
                  />
                  Yes, I have teaching experience
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hasTaughtBefore"
                    checked={formData.hasTaughtBefore === 'No'}
                    onChange={() => updateField('hasTaughtBefore', 'No')}
                    className="h-4 w-4 text-[#0B1E3D]"
                  />
                  No, fresh entrant / non-teaching
                </label>
              </div>

              {errors.hasTaughtBefore && (
                <p className="mt-2 text-xs text-[#C8102E]">{errors.hasTaughtBefore}</p>
              )}

              {formData.hasTaughtBefore === 'Yes' && (
                <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
                  <div>
                    <FormInput
                      label="Most Recent School Name"
                      required
                      value={formData.teachingSchoolName || ''}
                      onChange={(v) => updateField('teachingSchoolName', v)}
                      placeholder="e.g. Al-Huda Model Academy"
                      error={errors.teachingSchoolName}
                    />
                  </div>

                  <div>
                    <FormInput
                      label="Subjects Taught"
                      required
                      value={formData.teachingSubjects || ''}
                      onChange={(v) => updateField('teachingSubjects', v)}
                      placeholder="e.g. Islamic Religious Studies, Arabic, Biology"
                      error={errors.teachingSubjects}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Teaching Duration
                    </label>
                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <FormInput
                          type="number"
                          min="1"
                          value={formData.teachingDurationValue || ''}
                          onChange={(v) => updateField('teachingDurationValue', v)}
                          placeholder="e.g. 4"
                        />
                      </div>
                      <div className="w-1/2">
                        <FormSelect
                          value={formData.teachingDurationUnit || 'Years'}
                          onChange={(v) =>
                            updateField(
                              'teachingDurationUnit',
                              v as RecruitmentFormData['teachingDurationUnit']
                            )
                          }
                        >
                          <option value="Years">Years</option>
                          <option value="Months">Months</option>
                          <option value="Days">Days</option>
                        </FormSelect>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Did you hold any Administrative Positions?
                    </label>
                    <div className="mt-2 flex items-center gap-4 text-xs font-bold">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="heldAdminPosition"
                          checked={formData.heldAdminPosition === 'Yes'}
                          onChange={() => updateField('heldAdminPosition', 'Yes')}
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="heldAdminPosition"
                          checked={formData.heldAdminPosition === 'No'}
                          onChange={() => updateField('heldAdminPosition', 'No')}
                        />
                        No
                      </label>
                    </div>

                    {formData.heldAdminPosition === 'Yes' && (
                      <div className="mt-2">
                        <FormInput
                          value={formData.adminPositionTitle || ''}
                          onChange={(v) => updateField('adminPositionTitle', v)}
                          placeholder="e.g. Vice Principal, Exam Officer, Head of Dept"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {(requiresAdminSection(formData.position) || formData.position === 'teacher') && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#0B1E3D]">
                    Institutional Administration Experience
                  </h3>
                  {requiresAdminSection(formData.position) && (
                    <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-800">
                      Mandatory for Head Teacher
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-slate-700">
                    Have you ever administered a school as Principal, Headmaster, or Vice Principal?
                  </label>
                  <div className="mt-2 flex items-center gap-6">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="administeredSchool"
                        checked={formData.administeredSchool === 'Yes'}
                        onChange={() => updateField('administeredSchool', 'Yes')}
                        className="h-4 w-4"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="administeredSchool"
                        checked={formData.administeredSchool === 'No'}
                        onChange={() => updateField('administeredSchool', 'No')}
                        className="h-4 w-4"
                      />
                      No
                    </label>
                  </div>

                  {formData.administeredSchool === 'Yes' && (
                    <div className="mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2">
                      <div>
                        <FormInput
                          label="Position Held"
                          value={formData.adminRoleHeld || ''}
                          onChange={(v) => updateField('adminRoleHeld', v)}
                          placeholder="e.g. Principal / Headmaster"
                        />
                      </div>

                      <div>
                        <FormInput
                          label="School Name & Address"
                          value={formData.adminSchoolAddress || ''}
                          onChange={(v) => updateField('adminSchoolAddress', v)}
                          placeholder="e.g. Model Comprehensive College, Dutse"
                        />
                      </div>

                      <div>
                        <FormSelect
                          label="State"
                          value={formData.adminState || 'Jigawa'}
                          onChange={(v) => updateField('adminState', v)}
                        >
                          {nigerianStatesList.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </FormSelect>
                      </div>

                      <div>
                        <FormInput
                          label="Total Student Population Managed"
                          type="number"
                          value={formData.adminStudentPopulation || ''}
                          onChange={(v) => updateField('adminStudentPopulation', v)}
                          placeholder="e.g. 650"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 5: EMPLOYMENT RECORD & CURRENT STATUS */}
        {/* ================================================================= */}
        {currentStep.id === 'employment-record' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B1E3D]">
                Section 5: Employment Record & Current Status
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Present workplace engagement, salary benchmarks, and historical service.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <label className="block text-sm font-bold text-[#0B1E3D]">
                Are you presently employed? <span className="text-[#C8102E]">*</span>
              </label>

              <div className="mt-3 flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="isEmployed"
                    checked={formData.isEmployed === 'Yes'}
                    onChange={() => updateField('isEmployed', 'Yes')}
                    className="h-4 w-4"
                  />
                  Yes, currently employed
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="isEmployed"
                    checked={formData.isEmployed === 'No'}
                    onChange={() => updateField('isEmployed', 'No')}
                    className="h-4 w-4"
                  />
                  No, currently seeking employment
                </label>
              </div>

              {formData.isEmployed === 'Yes' && (
                <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
                  <div>
                    <FormInput
                      label="Current Place of Work & Name of Employer"
                      required
                      value={formData.currentEmployer || ''}
                      onChange={(v) => updateField('currentEmployer', v)}
                      placeholder="e.g. Jigawa State Ministry of Education"
                      error={errors.currentEmployer}
                    />
                  </div>

                  <div>
                    <FormInput
                      label="Current Rank / Job Title"
                      required
                      value={formData.currentRank || ''}
                      onChange={(v) => updateField('currentRank', v)}
                      placeholder="e.g. Senior Master II / Operations Supervisor"
                      error={errors.currentRank}
                    />
                  </div>

                  <div>
                    <FormInput
                      label="Approximate Monthly Salary (₦)"
                      value={formData.monthlySalary || ''}
                      onChange={(v) => updateField('monthlySalary', v)}
                      placeholder="e.g. 150,000"
                    />
                  </div>

                  <div>
                    <FormSelect
                      label="Total Years of Professional Service"
                      value={formData.totalYearsOfService || ''}
                      onChange={(v) => updateField('totalYearsOfService', v)}
                      placeholder="Select Total Years"
                    >
                      {Array.from({ length: 40 }, (_, i) => String(i + 1)).map((yr) => (
                        <option key={yr} value={yr}>
                          {yr} {yr === '1' ? 'Year' : 'Years'}
                        </option>
                      ))}
                      <option value="40+">40+ Years</option>
                    </FormSelect>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0B1E3D]">
                    Previous Employment Record
                  </h3>
                  <p className="text-xs text-slate-500">
                    Provide historical employers, schools, or organizations served.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addEmploymentHistory}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#0B1E3D] bg-blue-50/50 px-3.5 py-2 text-xs font-bold text-[#0B1E3D] hover:bg-blue-100"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Previous Role
                </button>
              </div>

              {formData.previousEmployments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500">
                  No previous employment entries added yet. Click &ldquo;Add Previous Role&rdquo; to add past service records.
                </div>
              ) : (
                formData.previousEmployments.map((emp, index) => (
                  <div
                    key={emp.id}
                    className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between border-b border-slate-200/60 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Record #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeEmploymentHistory(emp.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <FormInput
                          label="Organization / School Name"
                          value={emp.companyName}
                          onChange={(v) => updateEmploymentHistory(emp.id, 'companyName', v)}
                          placeholder="e.g. Standard Model College"
                        />
                      </div>

                      <div>
                        <FormInput
                          label="Job Title / Rank Held"
                          value={emp.role}
                          onChange={(v) => updateEmploymentHistory(emp.id, 'role', v)}
                          placeholder="e.g. Head of Science Dept"
                        />
                      </div>

                      <div>
                        <FormInput
                          label="Start Date"
                          value={emp.startDate}
                          onChange={(v) => updateEmploymentHistory(emp.id, 'startDate', v)}
                          placeholder="e.g. Sept 2018"
                        />
                      </div>

                      <div>
                        <FormInput
                          label="End Date"
                          value={emp.endDate}
                          onChange={(v) => updateEmploymentHistory(emp.id, 'endDate', v)}
                          placeholder="e.g. July 2023"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 6: PROFESSIONAL, RESEARCH & ENGLISH PROFILE */}
        {/* ================================================================= */}
        {currentStep.id === 'professional-research' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B1E3D]">
                Section 6: Academic, Professional & Language Profile
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Institutional memberships (TRCN, NIM, CPN, NCS), research publications, and language certifications.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <label className="block text-sm font-bold text-[#0B1E3D]">
                Are you a registered member of any recognized Professional Body?
              </label>
              <p className="text-xs text-slate-500">
                e.g. Teachers Registration Council of Nigeria (TRCN), Nigerian Institute of Management (NIM), Computer Professionals of Nigeria (CPN).
              </p>

              <div className="mt-3 flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hasProfessionalMembership"
                    checked={formData.hasProfessionalMembership === 'Yes'}
                    onChange={() => updateField('hasProfessionalMembership', 'Yes')}
                    className="h-4 w-4"
                  />
                  Yes, registered member
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hasProfessionalMembership"
                    checked={formData.hasProfessionalMembership === 'No'}
                    onChange={() => updateField('hasProfessionalMembership', 'No')}
                    className="h-4 w-4"
                  />
                  No
                </label>
              </div>

              {formData.hasProfessionalMembership === 'Yes' && (
                <div className="mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-3">
                  <div>
                    <FormInput
                      label="Organization Name"
                      value={formData.profOrgName || ''}
                      onChange={(v) => updateField('profOrgName', v)}
                      placeholder="e.g. TRCN"
                    />
                  </div>
                  <div>
                    <FormInput
                      label="Membership Rank / Status"
                      value={formData.profOrgRank || ''}
                      onChange={(v) => updateField('profOrgRank', v)}
                      placeholder="e.g. Certified Teacher"
                    />
                  </div>
                  <div>
                    <FormInput
                      label="Registration Year"
                      value={formData.profOrgRegYear || ''}
                      onChange={(v) => updateField('profOrgRegYear', v)}
                      placeholder="e.g. 2021"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <label className="block text-sm font-bold text-[#0B1E3D]">
                Have you authored any Independent Research Work (beyond thesis)?
              </label>

              <div className="mt-3 flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hasResearchWork"
                    checked={formData.hasResearchWork === 'Yes'}
                    onChange={() => updateField('hasResearchWork', 'Yes')}
                    className="h-4 w-4"
                  />
                  Yes, authored research
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hasResearchWork"
                    checked={formData.hasResearchWork === 'No'}
                    onChange={() => updateField('hasResearchWork', 'No')}
                    className="h-4 w-4"
                  />
                  No
                </label>
              </div>

              {formData.hasResearchWork === 'Yes' && (
                <div className="mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <FormInput
                      label="Research Paper / Article Title"
                      value={formData.researchTitle || ''}
                      onChange={(v) => updateField('researchTitle', v)}
                      placeholder="e.g. Pedagogical Integration of Tahfeez in Modern Secondary Schools"
                    />
                  </div>
                  <div>
                    <FormInput
                      label="Publisher / Journal Name"
                      value={formData.researchPublisher || ''}
                      onChange={(v) => updateField('researchPublisher', v)}
                      placeholder="e.g. Journal of Islamic Educational Research"
                    />
                  </div>
                  <div>
                    <FormInput
                      label="Year Published"
                      value={formData.researchPublicationYear || ''}
                      onChange={(v) => updateField('researchPublicationYear', v)}
                      placeholder="e.g. 2023"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <label className="block text-sm font-bold text-[#0B1E3D]">
                Do you hold an International English Language Certification?
              </label>
              <p className="text-xs text-slate-500">e.g. IELTS, TOEFL, Cambridge CELTA/TKT.</p>

              <div className="mt-3 flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hasEnglishCert"
                    checked={formData.hasEnglishCert === 'Yes'}
                    onChange={() => updateField('hasEnglishCert', 'Yes')}
                    className="h-4 w-4"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="hasEnglishCert"
                    checked={formData.hasEnglishCert === 'No'}
                    onChange={() => updateField('hasEnglishCert', 'No')}
                    className="h-4 w-4"
                  />
                  No
                </label>
              </div>

              {formData.hasEnglishCert === 'Yes' && (
                <div className="mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-3">
                  <div>
                    <FormInput
                      label="Certificate Name"
                      value={formData.englishCertName || ''}
                      onChange={(v) => updateField('englishCertName', v)}
                      placeholder="e.g. IELTS Academic"
                    />
                  </div>
                  <div>
                    <FormInput
                      label="Awarding Body"
                      value={formData.englishCertInstitution || ''}
                      onChange={(v) => updateField('englishCertInstitution', v)}
                      placeholder="e.g. British Council"
                    />
                  </div>
                  <div>
                    <FormInput
                      label="Year Awarded"
                      value={formData.englishCertYear || ''}
                      onChange={(v) => updateField('englishCertYear', v)}
                      placeholder="e.g. 2024"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 7: HIFZUL WAHYAIN, HADITH & ARABIC PROFICIENCY */}
        {/* ================================================================= */}
        {currentStep.id === 'faith-hifz-hadith' && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                  Flagship Specialization
                </span>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  حفظ الوحيين
                </span>
              </div>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#0B1E3D]">
                Section 8, 9 & 10: Qur’anic Hifz, Hadith & Arabic Mastery
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Core evaluation matrix for Hifzul Wahyain Islamic Faculty and academic scholars.
              </p>
            </div>

            {/* Custom 0–60 Hizb Slider Component */}
            <HizbSlider
              value={formData.hizbProgress}
              onChange={(val) => updateField('hizbProgress', val)}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                <label className="block text-xs font-bold text-[#0B1E3D]">
                  Possession of Formal Qur’anic Memorization Certificate / Ijazah?
                </label>
                <div className="mt-2.5 flex items-center gap-4 text-xs font-bold">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="hasQuranCertificate"
                      checked={formData.hasQuranCertificate === 'Yes'}
                      onChange={() => updateField('hasQuranCertificate', 'Yes')}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="hasQuranCertificate"
                      checked={formData.hasQuranCertificate === 'No'}
                      onChange={() => updateField('hasQuranCertificate', 'No')}
                    />
                    No
                  </label>
                </div>

                {formData.hasQuranCertificate === 'Yes' && (
                  <div className="mt-3">
                    <FormInput
                      value={formData.quranAwardingInstitution || ''}
                      onChange={(v) => updateField('quranAwardingInstitution', v)}
                      placeholder="Awarding Madrasah / Markaz Name"
                    />
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                <label className="block text-xs font-bold text-[#0B1E3D]">
                  Participation in Qur’anic Recitation Competition (Musabaqah)?
                </label>
                <div className="mt-2.5 flex items-center gap-4 text-xs font-bold">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="participatedMusabaqah"
                      checked={formData.participatedMusabaqah === 'Yes'}
                      onChange={() => updateField('participatedMusabaqah', 'Yes')}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="participatedMusabaqah"
                      checked={formData.participatedMusabaqah === 'No'}
                      onChange={() => updateField('participatedMusabaqah', 'No')}
                    />
                    No
                  </label>
                </div>

                {formData.participatedMusabaqah === 'Yes' && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <FormInput
                      value={formData.musabaqahCategory || ''}
                      onChange={(v) => updateField('musabaqahCategory', v)}
                      placeholder="Category (e.g. 60 Hizb)"
                    />
                    <FormSelect
                      value={formData.musabaqahLevel || ''}
                      onChange={(v) =>
                        updateField(
                          'musabaqahLevel',
                          v as RecruitmentFormData['musabaqahLevel']
                        )
                      }
                      placeholder="Select Level"
                    >
                      <option value="LGA Level">LGA Level</option>
                      <option value="State Level">State Level</option>
                      <option value="National Level">National Level</option>
                      <option value="International Level">International Level</option>
                    </FormSelect>
                  </div>
                )}
              </div>
            </div>

            {/* Modes of Recitation (Riwayah / Qira'at) */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <label className="block text-sm font-bold text-[#0B1E3D]">
                Mastery of Modes of Recitation (Riwayah / Qira’at):
              </label>
              <p className="text-xs text-slate-500">
                Check all canonical recitations in which you hold recitation proficiency or sanad.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {qiraatRiwayatList.map((item) => {
                  const isChecked = formData.modesOfRecitation.includes(item.name)
                  return (
                    <label
                      key={item.name}
                      className={`flex items-start gap-3 rounded-xl border p-3 text-xs transition cursor-pointer ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-500'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const current = [...formData.modesOfRecitation]
                          if (e.target.checked) {
                            updateField('modesOfRecitation', [...current, item.name])
                          } else {
                            updateField(
                              'modesOfRecitation',
                              current.filter((n) => n !== item.name)
                            )
                          }
                        }}
                        className="mt-0.5 rounded text-emerald-700"
                      />
                      <div>
                        <span className="font-bold text-[#0B1E3D]">{item.name}</span>
                        <span className="block text-[11px] text-emerald-800 font-arabic">
                          {item.arabic}
                        </span>
                        <span className="block text-[10px] text-slate-400">
                          {item.popularRegion}
                        </span>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Section 9: Canonical Books of Hadith Studied */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <label className="block text-sm font-bold text-[#0B1E3D]">
                Canonical Books of Hadith Studied (الكتب المعتمدة في الحديث):
              </label>
              <p className="text-xs text-slate-500">
                Select from the canonical corpus studied under recognized Mashayikh.
              </p>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                {canonicalHadithBooks.map((book) => {
                  const isChecked = formData.hadithBooksStudied.includes(book.title)
                  return (
                    <label
                      key={book.id}
                      className={`flex items-start gap-2.5 rounded-xl border p-2.5 text-xs transition cursor-pointer ${
                        isChecked
                          ? 'border-[#0B1E3D] bg-white ring-2 ring-[#0B1E3D]/20 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const current = [...formData.hadithBooksStudied]
                          if (e.target.checked) {
                            updateField('hadithBooksStudied', [...current, book.title])
                          } else {
                            updateField(
                              'hadithBooksStudied',
                              current.filter((t) => t !== book.title)
                            )
                          }
                        }}
                        className="mt-0.5 rounded text-[#0B1E3D]"
                      />
                      <div>
                        <span className="font-bold text-[#0B1E3D]">{book.title}</span>
                        <span className="block text-[10px] text-slate-500 font-arabic">
                          {book.arabicTitle}
                        </span>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Section 10: Arabic Language Proficiency */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <h3 className="font-serif text-lg font-bold text-[#0B1E3D]">
                Section 10: Arabic Language Proficiency
              </h3>
              <p className="text-xs text-slate-500">
                Fluency, formal certifications, and immersion programs.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <FormSelect
                    label="Can you speak Arabic fluently?"
                    value={formData.speakArabicFluently || ''}
                    onChange={(v) =>
                      updateField(
                        'speakArabicFluently',
                        v as RecruitmentFormData['speakArabicFluently']
                      )
                    }
                    placeholder="Select Fluency Level"
                  >
                    <option value="Yes">Yes, Fluent Speaker & Writer</option>
                    <option value="No">No / Intermediate Comprehension</option>
                  </FormSelect>
                </div>

                <div>
                  <FormSelect
                    label="Formal Arabic Qualification Held"
                    value={formData.formalArabicQualification || 'None'}
                    onChange={(v) => updateField('formalArabicQualification', v)}
                  >
                    {arabicQualificationsList.map((qual) => (
                      <option key={qual} value={qual}>
                        {qual}
                      </option>
                    ))}
                  </FormSelect>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 8: DOCUMENT UPLOADS & CREDENTIALS MATRIX */}
        {/* ================================================================= */}
        {currentStep.id === 'document-uploads' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B1E3D]">
                Section 11: Required Uploads & Credentials
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Upload verified PDF or image scans of your credentials. Max 100MB per file with client compression support.
              </p>
            </div>

            {/* Strict Dynamic Rule: CV Upload enforcement */}
            {isCvNeeded ? (
              <div className="rounded-2xl border-2 border-[#0B1E3D]/30 bg-blue-50/40 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1E3D] text-white">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#0B1E3D]">
                          Curriculum Vitae (CV / Resume)
                        </span>
                        <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-[#C8102E]">
                          Mandatory *
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Upload your latest comprehensive resume. Accepts PDF or DOCX (Max 10MB).
                      </p>
                    </div>
                  </div>

                  <div>
                    {formData.cvFile || fileStorage['cv'] ? (
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800">
                          Attached: {fileStorage['cv']?.name || 'CV Document'}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile('cv')}
                          className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0B1E3D] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#153463]">
                        <Upload className="h-3.5 w-3.5" />
                        Upload CV / Resume
                        <input
                          type="file"
                          accept="application/pdf,.doc,.docx"
                          className="sr-only"
                          onChange={(e) => handleFileUpload('cv', e.target.files?.[0])}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {errors.cv && <p className="mt-3 text-xs font-bold text-[#C8102E]">{errors.cv}</p>}
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-700" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      CV Exemption Policy
                    </span>
                    <p className="text-xs font-medium text-emerald-950">
                      For the position of <strong>{activePosition.title}</strong>, institutional policy strictly
                      waives the CV requirement. Your passport photograph and verification particulars suffice.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Position-Specific Uploads */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#0B1E3D]">
                Specific Credential Scans for {activePosition.title}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {activePosition.requiredUploads
                  .filter((k) => k !== 'passport' && k !== 'cv')
                  .map((key) => {
                    const meta = uploadFieldMeta[key]
                    const hasFile = Boolean(formData.additionalFiles[key] || fileStorage[key])
                    return (
                      <div
                        key={key}
                        className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-[#0B1E3D]">
                              {meta?.label || key}
                            </h4>
                            {hasFile && (
                              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                                Attached
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                            {meta?.description || 'Upload supporting document (PDF or Image).'}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                          {hasFile ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-600 truncate max-w-[180px]">
                                {fileStorage[key]?.name || 'File attached'}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(key)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50">
                              <Upload className="h-3 w-3" />
                              Select File
                              <input
                                type="file"
                                accept="application/pdf,image/jpeg,image/png"
                                className="sr-only"
                                onChange={(e) => handleFileUpload(key, e.target.files?.[0])}
                              />
                            </label>
                          )}
                          <span className="text-[10px] text-slate-400">PDF, PNG or JPG</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 9: FINAL REVIEW, OATH & DIGITAL SIGNATURE */}
        {/* ================================================================= */}
        {currentStep.id === 'review-attestation' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B1E3D]">
                Section 11: Institutional Review & Attestation
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Confirm your application summary, certify the declaration under legal and Islamic oath, and submit your dossier.
              </p>
            </div>

            {/* In-Review Upload Fallbacks (Enables 1-click completion without navigating back) */}
            {isCvNeeded && !formData.cvFile && !fileStorage['cv'] && (
              <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0 text-amber-700 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                        Action Required Before Submission
                      </p>
                      <p className="text-sm font-bold text-amber-950">
                        Upload your Curriculum Vitae (CV / Resume)
                      </p>
                      <p className="text-xs text-amber-800">
                        A CV is mandatory for {activePosition.title}. You can attach it right here:
                      </p>
                    </div>
                  </div>

                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0B1E3D] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#153463]">
                    <Upload className="h-3.5 w-3.5" />
                    Attach CV Now
                    <input
                      type="file"
                      accept="application/pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) => handleFileUpload('cv', e.target.files?.[0])}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Dossier Summary Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <h3 className="font-serif text-lg font-bold text-[#0B1E3D]">
                Application Dossier Summary
              </h3>

              <div className="mt-4 grid gap-4 text-xs sm:grid-cols-3">
                <div className="rounded-xl bg-white p-3 border border-slate-200/60">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    Role Applied
                  </span>
                  <p className="mt-1 font-bold text-[#0B1E3D]">{activePosition.title}</p>
                  <p className="text-slate-500">{activePosition.department}</p>
                </div>

                <div className="rounded-xl bg-white p-3 border border-slate-200/60">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    Candidate Name
                  </span>
                  <p className="mt-1 font-bold text-[#0B1E3D]">
                    {formData.fullName || 'Not provided'}
                  </p>
                  <p className="text-slate-500">{formData.phone}</p>
                </div>

                <div className="rounded-xl bg-white p-3 border border-slate-200/60">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    Geopolitical Origin
                  </span>
                  <p className="mt-1 font-bold text-[#0B1E3D]">
                    {formData.lga || 'Dutse'}, {formData.state || 'Jigawa'} State
                  </p>
                  <p className="text-slate-500">{formData.nationality}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>
                    CV Status:{' '}
                    <strong>
                      {formData.cvFile || fileStorage['cv']
                        ? 'Attached'
                        : isCvNeeded
                        ? 'Missing'
                        : 'Exempted'}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>
                    Passport Photo:{' '}
                    <strong>
                      {formData.passportPhoto || fileStorage['passport'] ? 'Attached' : 'Missing'}
                    </strong>
                  </span>
                </div>

                {formData.hizbProgress > 0 && (
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <span>
                      Qur’anic Progress: <strong>{formData.hizbProgress} / 60 Hizb</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Solemn Oath & Attestation Checkbox */}
            <div
              className={`rounded-2xl border-2 p-6 transition ${
                !formData.attested && submissionErrors.length > 0
                  ? 'border-red-400 bg-red-50/50'
                  : 'border-amber-900/20 bg-amber-50/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="attestation-checkbox"
                  checked={formData.attested}
                  onChange={(e) => updateField('attested', e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-amber-400 text-[#0B1E3D] focus:ring-amber-500 cursor-pointer"
                />
                <label
                  htmlFor="attestation-checkbox"
                  className="text-xs leading-relaxed text-amber-950 cursor-pointer"
                >
                  <strong className="block text-sm font-bold text-[#0B1E3D] mb-1">
                    Solemn Institutional & Islamic Oath of Truthfulness <span className="text-[#C8102E]">*</span>:
                  </strong>
                  &ldquo;I hereby solemnly swear and certify before Allah (SWT) and the Governing Council
                  of Al-Burhan Academy that all statements, dates, academic qualifications, and documents
                  provided in this recruitment application are authentic, accurate, and truthful. I understand
                  that any false claim or forgery will result in immediate disqualification and forfeiture of
                  appointment, with legal reporting as appropriate.&rdquo;
                </label>
              </div>

              {errors.attested && (
                <p className="mt-3 text-xs font-bold text-[#C8102E]">{errors.attested}</p>
              )}
            </div>

            {/* Digital Signature & Timestamp */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <FormInput
                  label="Applicant Digital Signature (Type Full Legal Name)"
                  required
                  value={formData.digitalSignature}
                  onChange={(v) => updateField('digitalSignature', v)}
                  placeholder="e.g. Ibrahim Aliyu Ringim"
                  error={errors.digitalSignature}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Attestation Confirmation Date
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData.signatureDate}
                  style={{ colorScheme: 'light' }}
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 py-3 px-4 text-sm font-mono text-slate-700 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls Footer */}
        <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
          <button
            type="button"
            disabled={currentStepIndex === 0}
            onClick={handlePrev}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous Step
          </button>

          {currentStepIndex < activeSteps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0B1E3D] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-950/20 hover:bg-[#153463] focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            >
              Save & Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-950/30 hover:bg-[#990F23] focus:outline-none focus:ring-4 focus:ring-red-500/20 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Dossier...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Official Application
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
