export type AdmissionTrack = 'general' | 'hifzul_wahyain'
export type ResidentialMode = 'day' | 'boarding'

export interface AdmissionFiles {
  passportPhoto?: File
  birthCertificate?: File
  previousAcademicReport?: File
  quranCertification?: File
}

export interface AdmissionFormData {
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
  gender: 'Male' | 'Female' | ''
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
  madrasahExperience: 'Yes' | 'No' | ''
  madrasahDetails: string
  files: AdmissionFiles
  attested: boolean
}

export const initialAdmissionData: AdmissionFormData = {
  admissionTrack: 'general', entryLevel: 'Primary 1', secondaryTrack: 'General', residentialMode: 'day',
  priorQuranMemorization: 'None', hadithBackground: 'Beginner', arabicProficiencyLevel: 'Basic',
  surname: '', firstName: '', otherNames: '', gender: '', dateOfBirth: '', stateOfOrigin: '', lga: '', residentialAddress: '', applicantPhone: '', applicantEmail: '',
  guardianName: '', guardianRelationship: '', guardianPhone: '', alternatePhone: '', whatsappNumber: '', guardianEmail: '', occupation: '', guardianTown: '',
  lastSchool: '', highestClass: '', madrasahExperience: '', madrasahDetails: '', files: {}, attested: false,
}

export const admissionSteps = ['Program & cohort', 'Applicant bio-data', 'Guardian details', 'Academic history', 'Documents', 'Review & submit']

export function getApplicationReference(data: AdmissionFormData) {
  const track = data.admissionTrack === 'hifzul_wahyain' ? 'HW' : 'GEN'
  return `ABR-2026-${track}-0482`
} 

export type FileField = keyof AdmissionFiles
export const fileLimits: Record<FileField, number> = { passportPhoto: 2, birthCertificate: 3, previousAcademicReport: 5, quranCertification: 5 }
export const fileLabels: Record<FileField, string> = { passportPhoto: 'Passport photograph', birthCertificate: 'Birth certificate / NPC declaration', previousAcademicReport: 'Previous academic report', quranCertification: 'Imam / Sheikh recommendation or Tahfeez certificate' }

export type FieldErrors = Partial<Record<keyof AdmissionFormData, string>>

export function createEmptyAdmissionData() { return { ...initialAdmissionData, files: {} } }
                    
