export type AdmissionTrack = 'general' | 'hifzul_wahyain'
export type ResidentialMode = 'day' | 'boarding'

export interface AdmissionApplication {
  admissionTrack: AdmissionTrack
  entryLevel: string
  secondaryTrack: string
  residentialMode: ResidentialMode
  priorQuranMemorization: string
  hadithBackground: string
  arabicProficiencyLevel: string
  surname: string
  firstName: string
  otherNames: string
  gender: string
  dateOfBirth: string
  stateOfOrigin: string
  lga: string
  residentialAddress: string
  applicantPhone: string
  applicantEmail: string
  guardianName: string
  guardianRelationship: string
  guardianPhone: string
  alternatePhone: string
  whatsappNumber: string
  guardianEmail: string
  occupation: string
  guardianTown: string
  lastSchool: string
  highestClass: string
  madrasahExperience: string
  madrasahDetails: string
  passportPhoto?: File
  birthCertificate?: File
  previousAcademicReport?: File
  quranCertification?: File
  attested: boolean
}

export const emptyApplication: AdmissionApplication = {
  admissionTrack: 'general', entryLevel: 'Primary 1', secondaryTrack: 'General', residentialMode: 'day',
  priorQuranMemorization: 'None', hadithBackground: 'Beginner', arabicProficiencyLevel: 'Basic',
  surname: '', firstName: '', otherNames: '', gender: '', dateOfBirth: '', stateOfOrigin: 'Jigawa', lga: 'Ringim', residentialAddress: '', applicantPhone: '', applicantEmail: '',
  guardianName: '', guardianRelationship: 'Father', guardianPhone: '+234 ', alternatePhone: '', whatsappNumber: '+234 ', guardianEmail: '', occupation: '', guardianTown: '',
  lastSchool: '', highestClass: '', madrasahExperience: 'No', madrasahDetails: '', attested: false,
}

export const steps = ['Programme & cohort', 'Applicant bio-data', 'Guardian details', 'Academic background', 'Documents', 'Review & submit']

export function getApplicationReference(track: AdmissionTrack) {
  const suffix = Math.floor(1000 + Math.random() * 9000)
  return `ABR-2026-${track === 'hifzul_wahyain' ? 'HW' : 'GEN'}-${suffix}`
}

export function toDraft(application: AdmissionApplication) {
  const { passportPhoto, birthCertificate, previousAcademicReport, quranCertification, ...draft } = application
  return draft
}

export type DraftApplication = Omit<AdmissionApplication, 'passportPhoto' | 'birthCertificate' | 'previousAcademicReport' | 'quranCertification'>

export function isHifzul(application: AdmissionApplication) { return application.admissionTrack === 'hifzul_wahyain' }

export function labelTrack(track: AdmissionTrack) { return track === 'hifzul_wahyain' ? 'Hifzul Wahyain Intensive' : 'Standard Academic Track' }

export function formatFile(file?: File) { return file ? `${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)` : 'Not attached' }

export function isValidEmail(value: string) { return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) }

export function isValidNigeriaPhone(value: string) { return /^\+234\s?\d{10}$/.test(value.replace(/[-()]/g, '')) }

export function fullName(application: AdmissionApplication) { return [application.surname, application.firstName, application.otherNames].filter(Boolean).join(' ') }

export function getTrackDescription(track: AdmissionTrack) { return track === 'hifzul_wahyain' ? 'Preservation of the Two Revelations: Al-Qur'an & As-Sunnah.' : 'Early years, basic, junior and senior secondary education.' }

export function requiredDocuments(application: AdmissionApplication) { return application.admissionTrack === 'hifzul_wahyain' ? 4 : 3 }

export function uploadedDocuments(application: AdmissionApplication) { return [application.passportPhoto, application.birthCertificate, application.previousAcademicReport, application.admissionTrack === 'hifzul_wahyain' ? application.quranCertification : null].filter(Boolean).length }

export function getStepTitle(step: number) { return steps[step] }

export function isComplete(application: AdmissionApplication) { return application.attested && uploadedDocuments(application) === requiredDocuments(application) }

export function safeText(value: string) { return value.trim().replace(/[<>]/g, '') }

export function admissionYear() { return '2026/2027' }

export function programmeLabel(application: AdmissionApplication) { return application.admissionTrack === 'hifzul_wahyain' ? 'One-Year Intensive Diploma / Fellowship' : `${application.entryLevel}${application.secondaryTrack !== 'General' ? ` · ${application.secondaryTrack}` : ''}` }

export function residentialLabel(mode: ResidentialMode) { return mode === 'boarding' ? 'Full Boarding' : 'Day Student' }

export function fileAccept() { return '.jpg,.jpeg,.png,.pdf' }

export function maxBytes(kind: string) { return kind === 'passportPhoto' ? 2 * 1024 * 1024 : kind === 'birthCertificate' ? 3 * 1024 * 1024 : 5 * 1024 * 1024 }

export function fileError(file: File, kind: string) { if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) return 'Use a JPEG, PNG, or PDF file.'; if (file.size > maxBytes(kind)) return `This file exceeds the ${maxBytes(kind) / 1024 / 1024}MB limit.`; return '' }

export function sectionForStep(step: number) { return ['program', 'bio', 'guardian', 'academic', 'documents', 'review'][step] }

export const academyContact = { phone: '+234 906 401 5827', email: 'alburhanacademyringim@gmail.com', location: 'Ringim LGA, Jigawa State' }

export const hifzulHighlights = ['Sanad / Isnad methodology', 'Tajweed precision', 'Arba'een & Umdatul Ahkam', 'Arabic immersion', 'Boarding-intensive cohort']

export const entryLevels = ['Pre-Nursery', 'Nursery', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3']

export const states = ['Jigawa', 'Kano', 'Bauchi', 'Kaduna', 'Katsina', 'Kebbi', 'Yobe', 'Other']

export const genders = ['Male', 'Female']

export const relationships = ['Father', 'Mother', 'Legal Guardian', 'Sponsor']

export const quranLevels = ['None', '1–15 Hizb', '16–30 Hizb', 'Complete Qur'an (60 Hizb)']

export const hadithLevels = ['Beginner', 'Intermediate', 'Completed Arba'een']

export const arabicLevels = ['Basic', 'Intermediate', 'Fluent']

export const schoolClasses = ['Primary', 'JSS', 'SSS', 'Other']

export const yesNo = ['Yes', 'No']

export const fieldLabels: Record<string, string> = { passportPhoto: 'Passport photograph', birthCertificate: 'Birth certificate / NPC declaration', previousAcademicReport: 'Academic report / transfer certificate', quranCertification: 'Imam / Sheikh recommendation or Tahfeez certificate' }

export const printInstructions = 'Print this slip and present it with your original documents during physical screening at the Ringim campus.'

export const portalTitle = 'Online Admission & Recruitment Portal'

export const portalSubtitle = 'Securely submit your application to Al-Burhan Academy.'

export const institutionName = 'AL-BURHAN ACADEMY'

export const institutionTagline = 'The Fountain of Knowledge'

export const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K5gmvm7cTVsDIz6pp1Q55IbHWUfZzo.png'

export const documentKinds = ['passportPhoto', 'birthCertificate', 'previousAcademicReport', 'quranCertification'] as const

export type DocumentKind = typeof documentKinds[number]

export const accentColors = { navy: '#0B1E3D', blue: '#1E3A8A', crimson: '#C8102E', emerald: '#065F46' }

export const applicationStorageKey = 'al-burhan-admission-draft'

export const initialReference = 'ABR-2026-GEN-0000'

export const screeningAddress = 'Al-Burhan Academy, Km 50 Along Ringim-Kanya Babba Road, Opp. Government Unity Secondary School, Ringim LGA, Jigawa State.'

export const serviceOptions = ['Day Student', 'Full Boarding']

export const trackOptions = ['Standard Academic Track', 'Hifzul Wahyain Intensive']

export const hifzulName = 'حفظ الوحيين'

export const hifzulTranslation = 'Memorization and mastery of the Two Revelations'

export const reviewSections = ['Programme', 'Applicant', 'Guardian', 'Academic', 'Documents']

export const applicationStatus = 'Ready for screening'

export const validationMessage = 'Please complete the required fields before continuing.'

export const successMessage = 'Application submitted successfully.'

export const uploadHint = 'Drag and drop or browse from your device.'

export const requiredMark = 'Required'

export const optionalMark = 'Optional'

export const footerNote = 'Your draft is saved on this device. Files are kept in memory until submission.'

export const screeningNote = 'Bring original documents for verification.'

export const supportNote = 'Need help? Call +234 906 401 5827.'

export const ageNote = 'Applicants should provide their date of birth accurately for placement.'

export const privacyNote = 'Your details are used only for admission processing.'

export const documentNote = 'Accepted: JPEG, PNG, PDF. Size limits apply per document.'

export const trackBadge = '2026/2027 Admissions'

export const hifzulBadge = 'Flagship programme'

export const genBadge = 'Day & boarding'

export const submitLabel = 'Submit application'

export const nextLabel = 'Continue'

export const backLabel = 'Back'

export const finishLabel = 'Review application'

export const newLabel = 'Start new application'

export const printLabel = 'Print application slip'

export const portalPath = '/admissions'

export const brandHeading = 'A disciplined pathway to knowledge, character and service.'

export const defaultSecondaryTrack = 'General'

export const defaultMode: ResidentialMode = 'day'

export const portalVersion = 'v1.0'
