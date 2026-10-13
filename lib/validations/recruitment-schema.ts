import { z } from 'zod'
import { requiresCv, type PositionSlug, type RecruitmentFormData } from '@/types/recruitment'

/**
 * Validates whether applicant is at least 18 years of age.
 */
export function isAdult(dateString: string): boolean {
  if (!dateString) return false
  const dob = new Date(dateString)
  if (isNaN(dob.getTime())) return false

  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age >= 18
}

/**
 * Validates international and Nigerian telephone numbers.
 */
export function isValidPhoneNumber(phone: string): boolean {
  const clean = phone.replace(/[\s\-()]/g, '')
  // Accepts +234XXXXXXXXXX, 080XXXXXXXX, 070XXXXXXXX, 090XXXXXXXX, 081XXXXXXXX, or general E.164 (+1.. etc)
  return /^(?:\+234|0)[789][01]\d{8}$/.test(clean) || /^\+[1-9]\d{7,14}$/.test(clean)
}

// -------------------------------------------------------------
// Sub-schemas for repeatable sections
// -------------------------------------------------------------

export const institutionEntrySchema = z.object({
  id: z.string(),
  institutionName: z.string().min(1, 'Select or enter institution name'),
  customInstitution: z.string().optional(),
  yearGraduated: z.string().min(1, 'Select graduation year'),
  certificateObtained: z.string().min(1, 'Select certificate obtained'),
  dateObtained: z.string().optional(),
})

export const previousEmploymentEntrySchema = z.object({
  id: z.string(),
  companyName: z.string().min(1, 'Organization / School name is required'),
  role: z.string().min(1, 'Job title is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
})

export const hadithTaughtEntrySchema = z.object({
  id: z.string(),
  bookTitle: z.string().min(1, 'Book title is required'),
  institutionHalaqah: z.string().min(1, 'Institution / Mosque name is required'),
  location: z.string().optional(),
  periodTaught: z.string().optional(),
})

// -------------------------------------------------------------
// Master Recruitment Zod Schema
// -------------------------------------------------------------

export const recruitmentFormSchema = z
  .object({
    // Role selection
    position: z.string().min(1, 'Please select a position'),
    teacherTrack: z.enum(['General', 'Science', 'Arts', 'Tahfeez / Hifzul Wahyain']).optional(),

    // Section 1: Personal Information (All Positions)
    fullName: z
      .string()
      .trim()
      .min(3, 'Full legal name must be at least 3 characters')
      .regex(/^[a-zA-Z\s'.]+$/, 'Name must contain only alphabetic characters and spaces'),
    phone: z
      .string()
      .trim()
      .refine(isValidPhoneNumber, 'Enter a valid Nigerian (+234) or international telephone number'),
    gender: z.enum(['Male', 'Female']),
    maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed']),
    dateOfBirth: z
      .string()
      .min(1, 'Date of birth is required')
      .refine(isAdult, 'Applicant must be at least 18 years of age to apply'),
    residentialAddress: z
      .string()
      .trim()
      .min(6, 'Please enter a complete residential address with town/city'),
    nationality: z.string().min(1, 'Nationality is required'),
    state: z.string().min(1, 'State of origin is required'),
    lga: z.string().min(1, 'LGA of origin is required'),

    // Section 2: Educational Qualifications & Specialization
    presentQualification: z.string().optional(),
    specialization: z.string().optional(),

    // Section 3: Teaching Experience (Teacher & Head Teacher)
    hasTaughtBefore: z.enum(['Yes', 'No', '']).optional(),
    teachingSchoolName: z.string().optional(),
    teachingSubjects: z.string().optional(),
    teachingDurationValue: z.union([z.number(), z.string()]).optional(),
    teachingDurationUnit: z.enum(['Days', 'Months', 'Years']).optional(),
    heldAdminPosition: z.enum(['Yes', 'No', '']).optional(),
    adminPositionTitle: z.string().optional(),

    // Section 4: Educational Background & Repeatable History
    seniorSecondarySchool: z.string().optional(),
    institutionsAttended: z.array(institutionEntrySchema).optional(),

    // Section 5: Employment Record & Current Status
    isEmployed: z.enum(['Yes', 'No', '']).optional(),
    currentEmployer: z.string().optional(),
    currentRank: z.string().optional(),
    monthlySalary: z.string().optional(),
    previousEmployments: z.array(previousEmploymentEntrySchema).optional(),
    totalYearsOfService: z.string().optional(),

    // Section 6: Academic, Professional & Language Background
    hasProfessionalMembership: z.enum(['Yes', 'No', '']).optional(),
    profOrgName: z.string().optional(),
    profOrgRank: z.string().optional(),
    profOrgRegYear: z.string().optional(),

    hasResearchWork: z.enum(['Yes', 'No', '']).optional(),
    researchTitle: z.string().optional(),
    researchYear: z.string().optional(),
    researchPublicationYear: z.string().optional(),
    researchPublisher: z.string().optional(),

    hasEnglishCert: z.enum(['Yes', 'No', '']).optional(),
    englishCertName: z.string().optional(),
    englishCertYear: z.string().optional(),
    englishCertInstitution: z.string().optional(),

    // Section 7: Administrative Experience
    administeredSchool: z.enum(['Yes', 'No', '']).optional(),
    adminRoleHeld: z.string().optional(),
    adminSchoolAddress: z.string().optional(),
    adminState: z.string().optional(),
    adminDuration: z.string().optional(),
    adminStudentPopulation: z.union([z.number(), z.string()]).optional(),

    // Section 8: Mastery of Qur’anic Recitation & Hifz
    hizbProgress: z.number().min(0).max(60),
    hasQuranCertificate: z.enum(['Yes', 'No', '']).optional(),
    quranAwardingInstitution: z.string().optional(),
    quranDateOfAward: z.string().optional(),

    participatedMusabaqah: z.enum(['Yes', 'No', '']).optional(),
    musabaqahYear: z.string().optional(),
    musabaqahCategory: z.string().optional(),
    musabaqahPosition: z.string().optional(),
    musabaqahLevel: z.string().optional(),

    attendedRecitationDaurah: z.enum(['Yes', 'No', '']).optional(),
    daurahHost: z.string().optional(),
    daurahDuration: z.string().optional(),
    daurahDate: z.string().optional(),

    modesOfRecitation: z.array(z.string()).optional(),
    otherRiwayah: z.string().optional(),

    // Section 9: Knowledge of Hadith
    hadithBooksStudied: z.array(z.string()).optional(),
    otherHadithBook: z.string().optional(),
    hadithBooksTaught: z.array(hadithTaughtEntrySchema).optional(),
    attendedHadithDaurah: z.enum(['Yes', 'No', '']).optional(),
    hadithDaurahOrg: z.string().optional(),
    hadithDaurahYear: z.string().optional(),
    hadithDaurahDuration: z.string().optional(),

    // Section 10: Arabic Language Proficiency
    speakArabicFluently: z.enum(['Yes', 'No', '']).optional(),
    formalArabicQualification: z.string().optional(),
    attendedArabicDaurah: z.enum(['Yes', 'No', '']).optional(),
    arabicDaurahHost: z.string().optional(),
    arabicDaurahDate: z.string().optional(),

    // Section 11: Document Uploads & Declarations
    attested: z.literal(true),
    digitalSignature: z.string().trim().min(3, 'Please type your full legal name as digital signature'),
    signatureDate: z.string().min(1, 'Signature date is required'),
  })
  // Dynamic position-specific refinements
  .superRefine((data, ctx) => {
    const slug = data.position as PositionSlug

    // Teaching Experience conditional check for Teacher / Head Teacher
    if (['teacher', 'head-teacher'].includes(slug)) {
      if (!data.hasTaughtBefore) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['hasTaughtBefore'],
          message: 'Please indicate whether you have prior teaching experience',
        })
      } else if (data.hasTaughtBefore === 'Yes') {
        if (!data.teachingSchoolName?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['teachingSchoolName'],
            message: 'School name is required for teaching experience',
          })
        }
        if (!data.teachingSubjects?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['teachingSubjects'],
            message: 'Subjects taught are required',
          })
        }
      }
    }

    // Head Teacher Administrative experience strict requirement
    if (slug === 'head-teacher') {
      if (!data.administeredSchool) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['administeredSchool'],
          message: 'Administrative history is required for Head Teacher applicants',
        })
      } else if (data.administeredSchool === 'Yes') {
        if (!data.adminRoleHeld?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['adminRoleHeld'],
            message: 'Please state the administrative position held',
          })
        }
        if (!data.adminSchoolAddress?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['adminSchoolAddress'],
            message: 'School name & address is required',
          })
        }
      }
    }

    // Employment details if employed is 'Yes'
    if (data.isEmployed === 'Yes') {
      if (!data.currentEmployer?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['currentEmployer'],
          message: 'Current employer / workplace name is required',
        })
      }
      if (!data.currentRank?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['currentRank'],
          message: 'Current job rank / designation is required',
        })
      }
    }

    // Quran certificate details if 'Yes'
    if (data.hasQuranCertificate === 'Yes' && !data.quranAwardingInstitution?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['quranAwardingInstitution'],
        message: 'Awarding institution / Madrasah is required',
      })
    }

    // Musabaqah details if 'Yes'
    if (data.participatedMusabaqah === 'Yes' && !data.musabaqahCategory?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['musabaqahCategory'],
        message: 'Competition category / Hizb tier is required',
      })
    }
  })

export type RecruitmentFormValues = z.infer<typeof recruitmentFormSchema>

/**
 * Step validation helpers for granular wizard validation
 */
export function validatePersonalSection(data: Partial<RecruitmentFormData>): Record<string, string> {
  const errors: Record<string, string> = {}
  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'Full legal name must be at least 3 characters'
  }
  if (!data.phone || !isValidPhoneNumber(data.phone)) {
    errors.phone = 'Enter a valid Nigerian (+234) or international telephone number'
  }
  if (!data.gender) {
    errors.gender = 'Please select your gender'
  }
  if (!data.maritalStatus) {
    errors.maritalStatus = 'Please select marital status'
  }
  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required'
  } else if (!isAdult(data.dateOfBirth)) {
    errors.dateOfBirth = 'Applicant must be at least 18 years old'
  }
  if (!data.residentialAddress || data.residentialAddress.trim().length < 6) {
    errors.residentialAddress = 'Enter a complete residential address'
  }
  if (!data.state) {
    errors.state = 'State of origin is required'
  }
  if (!data.lga) {
    errors.lga = 'LGA of origin is required'
  }
  return errors
}

export function validateEducationSection(
  data: Partial<RecruitmentFormData>,
  position: PositionSlug
): Record<string, string> {
  const errors: Record<string, string> = {}
  const rolesRequiringEdu: PositionSlug[] = [
    'head-teacher',
    'secretary',
    'ict-officer',
    'teacher',
    'security-officer',
    'matron',
    'kitchen-master',
  ]

  if (rolesRequiringEdu.includes(position)) {
    if (!data.presentQualification) {
      errors.presentQualification = 'Please select your highest academic qualification'
    }
    if (!data.specialization?.trim()) {
      errors.specialization = 'Please specify your area of discipline / specialization'
    }
  }
  return errors
}

export function validateTeachingSection(
  data: Partial<RecruitmentFormData>,
  position: PositionSlug
): Record<string, string> {
  const errors: Record<string, string> = {}
  if (['teacher', 'head-teacher'].includes(position)) {
    if (!data.hasTaughtBefore) {
      errors.hasTaughtBefore = 'Please state if you have taught before'
    } else if (data.hasTaughtBefore === 'Yes') {
      if (!data.teachingSchoolName?.trim()) {
        errors.teachingSchoolName = 'School name is required'
      }
      if (!data.teachingSubjects?.trim()) {
        errors.teachingSubjects = 'Subjects taught are required'
      }
    }
  }
  return errors
}

export function validateEmploymentSection(data: Partial<RecruitmentFormData>): Record<string, string> {
  const errors: Record<string, string> = {}
  if (data.isEmployed === 'Yes') {
    if (!data.currentEmployer?.trim()) {
      errors.currentEmployer = 'Current employer name is required'
    }
    if (!data.currentRank?.trim()) {
      errors.currentRank = 'Current job title / rank is required'
    }
  }
  return errors
}

export function validateFinalDeclaration(
  data: Partial<RecruitmentFormData>,
  position: PositionSlug,
  hasCvFile: boolean
): Record<string, string> {
  const errors: Record<string, string> = {}

  if (requiresCv(position) && !hasCvFile) {
    errors.cv = 'Curriculum Vitae (CV) upload is mandatory for this position'
  }

  if (!data.attested) {
    errors.attested = 'You must certify the legal and Islamic truthfulness declaration'
  }

  if (!data.digitalSignature || data.digitalSignature.trim().length < 3) {
    errors.digitalSignature = 'Please provide your full legal name as digital signature'
  }

  return errors
}
