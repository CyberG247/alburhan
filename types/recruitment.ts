export type Department =
  | 'Administrative & Leadership'
  | 'Academic & Religious Faculty'
  | 'Technical & ICT'
  | 'Campus Safety & Operations'
  | 'Food Services & Nutrition'
  | 'Facilities & Maintenance'

export type PositionSlug =
  | 'head-teacher'
  | 'secretary'
  | 'ict-officer'
  | 'teacher'
  | 'security-officer'
  | 'security-guard'
  | 'kitchen-master'
  | 'kitchen-attendant-cook'
  | 'messenger'
  | 'cleaner'
  | 'gardener'
  | 'matron'

export interface PositionSpec {
  slug: PositionSlug
  title: string
  department: Department
  summary: string
  qualifications: string
  requiredUploads: string[]
  cvRequired: boolean
  isTeachingRole: boolean
  isAcademicRole: boolean
  hasAdminSection: boolean
  hasFaithSection: boolean
  category: 'leadership' | 'academic' | 'technical' | 'safety' | 'hospitality' | 'facilities'
}

export const positions: PositionSpec[] = [
  {
    slug: 'head-teacher',
    title: 'Head Teacher',
    department: 'Administrative & Leadership',
    summary:
      'Executive academic and administrative leader; oversees curriculum integration (Deen & Dunya), faculty supervision, regulatory compliance, and community outreach.',
    qualifications:
      'Master’s or B.Ed / B.Sc with PGDE; minimum 5–7 years proven school administrative/leadership experience; multilingual (English & Arabic preferred); TRCN registered.',
    requiredUploads: ['passport', 'cv', 'degrees_pgde', 'admin_proofs'],
    cvRequired: true,
    isTeachingRole: true,
    isAcademicRole: true,
    hasAdminSection: true,
    hasFaithSection: true,
    category: 'leadership',
  },
  {
    slug: 'secretary',
    title: 'Secretary',
    department: 'Administrative & Leadership',
    summary:
      'Manages front-office communications, board correspondence, e-registry, student files, institutional documentation, and executive scheduling.',
    qualifications:
      'B.Sc/HND in Secretarial Studies, Office Tech Management, English, or Mass Comm; minimum 2 years experience; elite typing speed, MS Office/Google Workspace fluency.',
    requiredUploads: ['passport', 'cv', 'academic_certs'],
    cvRequired: true,
    isTeachingRole: false,
    isAcademicRole: true,
    hasAdminSection: false,
    hasFaithSection: false,
    category: 'leadership',
  },
  {
    slug: 'ict-officer',
    title: 'ICT Officer',
    department: 'Technical & ICT',
    summary:
      'Architects and maintains campus local networks, computer laboratories, school portal infrastructure, hardware diagnostics, and staff digital literacy.',
    qualifications:
      'B.Sc/HND in Computer Science, Cybersecurity, Software Engineering, or IT; hands-on knowledge of network topology, Linux/Windows server administration, and full-stack web basics.',
    requiredUploads: ['passport', 'cv', 'degree_diploma', 'tech_certs'],
    cvRequired: true,
    isTeachingRole: false,
    isAcademicRole: true,
    hasAdminSection: false,
    hasFaithSection: false,
    category: 'technical',
  },
  {
    slug: 'teacher',
    title: 'Teacher (General / Science / Arts / Tahfeez)',
    department: 'Academic & Religious Faculty',
    summary:
      'Delivers subject mastery, prepares lesson plans, enforces classroom discipline, and implements integrated Western and Islamic learning paradigms.',
    qualifications:
      'Ph.D., M.Sc, B.Sc(Ed), B.A(Ed), B.Sc, HND, or NCE in relevant subject areas; TRCN certification or Islamic scholarship credentials (Tahfeez/Hadith fluency for religious tracks).',
    requiredUploads: ['passport', 'cv', 'degree_nce', 'transcripts'],
    cvRequired: true,
    isTeachingRole: true,
    isAcademicRole: true,
    hasAdminSection: false,
    hasFaithSection: true,
    category: 'academic',
  },
  {
    slug: 'security-officer',
    title: 'Security Officer',
    department: 'Campus Safety & Operations',
    summary:
      'Directs campus physical safety, coordinates guard details, investigates breaches, manages emergency responses, and liaises with law enforcement.',
    qualifications:
      'Retired Military/Police personnel, B.Sc/HND in Criminology or Security Studies; minimum 3 years supervisory security experience; certified in physical security protocols.',
    requiredUploads: ['passport', 'cv', 'discharge_service', 'valid_id'],
    cvRequired: true,
    isTeachingRole: false,
    isAcademicRole: false,
    hasAdminSection: false,
    hasFaithSection: false,
    category: 'safety',
  },
  {
    slug: 'security-guard',
    title: 'Security Guard',
    department: 'Campus Safety & Operations',
    summary:
      'Enforces perimeter access control, visitor screening, nighttime patrols, gate logs, and student safety protocols.',
    qualifications:
      'SSCE / WAEC / NECO / Trade Test; physical fitness, clean criminal record, basic English and Hausa communication; prior vigilante or corporate guard experience preferred.',
    requiredUploads: ['passport', 'cv', 'ssce_cert', 'guarantor_form'],
    cvRequired: true,
    isTeachingRole: false,
    isAcademicRole: false,
    hasAdminSection: false,
    hasFaithSection: false,
    category: 'safety',
  },
  {
    slug: 'kitchen-master',
    title: 'Kitchen Master',
    department: 'Food Services & Nutrition',
    summary:
      'Oversees campus culinary logistics, student dietary schedules, food storage inventories, hygiene compliance, and meal service execution.',
    qualifications:
      'OND/HND or National Diploma in Hospitality & Catering Management, or Food Science; minimum 3 years managing institutional kitchens or school dining halls.',
    requiredUploads: ['passport', 'cv', 'food_hygiene', 'trade_test'],
    cvRequired: true,
    isTeachingRole: false,
    isAcademicRole: false,
    hasAdminSection: false,
    hasFaithSection: false,
    category: 'hospitality',
  },
  {
    slug: 'kitchen-attendant-cook',
    title: 'Kitchen Attendant / Cook',
    department: 'Food Services & Nutrition',
    summary:
      'Prepares daily 3-square meals for boarding students and staff, handles ingredients, maintains kitchen sanitation, and manages meal serving.',
    qualifications:
      'SSCE, Trade Test Grade I/II in Catering, or relevant apprenticeship; proven experience in high-volume commercial/institutional cooking; food safety certified.',
    requiredUploads: ['passport', 'cv', 'trade_test_ssce', 'medical_fitness'],
    cvRequired: true,
    isTeachingRole: false,
    isAcademicRole: false,
    hasAdminSection: false,
    hasFaithSection: false,
    category: 'hospitality',
  },
  {
    slug: 'messenger',
    title: 'Messenger / Errand',
    department: 'Campus Safety & Operations',
    summary:
      'Handles document dispatch across departments, campus supply errands, office errands, and physical distribution of notices.',
    qualifications:
      'First School Leaving Certificate (FSLC) or SSCE; trustworthiness, punctuality, and basic literacy/numeracy.',
    requiredUploads: ['passport', 'cv', 'fslc_ssce', 'guarantor_form'],
    cvRequired: true,
    isTeachingRole: false,
    isAcademicRole: false,
    hasAdminSection: false,
    hasFaithSection: false,
    category: 'safety',
  },
  {
    slug: 'cleaner',
    title: 'Cleaner',
    department: 'Facilities & Maintenance',
    summary:
      'Ensures pristine sanitation across academic halls, offices, restrooms, and residential spaces; maintains chemical cleaning safety.',
    qualifications:
      'FSLC or basic literacy; demonstrated diligence, attention to hygiene, and stamina.',
    requiredUploads: ['passport'],
    cvRequired: false,
    isTeachingRole: false,
    isAcademicRole: false,
    hasAdminSection: false,
    hasFaithSection: false,
    category: 'facilities',
  },
  {
    slug: 'gardener',
    title: 'Gardener',
    department: 'Facilities & Maintenance',
    summary:
      'Manages campus landscaping, tree pruning, lawns, drainage pathways, and aesthetic greenery across the school perimeter.',
    qualifications:
      'Proven experience in horticulture, landscaping, or agricultural maintenance; stamina and skill with manual and motorized gardening tools.',
    requiredUploads: ['passport'],
    cvRequired: false,
    isTeachingRole: false,
    isAcademicRole: false,
    hasAdminSection: false,
    hasFaithSection: false,
    category: 'facilities',
  },
  {
    slug: 'matron',
    title: 'Matron',
    department: 'Facilities & Maintenance',
    summary:
      'Oversees female boarding hostels, student pastoral care, domestic cleanliness, emotional support, and disciplinary health checks.',
    qualifications:
      'NCE, Registered Nurse (RN/RM), Community Health Diploma, or B.Sc in Guidance & Counseling/Social Work; mature, compassionate, with boarding school hostel experience.',
    requiredUploads: ['passport', 'cv', 'nursing_health_certs'],
    cvRequired: true,
    isTeachingRole: false,
    isAcademicRole: false,
    hasAdminSection: false,
    hasFaithSection: false,
    category: 'facilities',
  },
]

export const departments: Department[] = [
  'Administrative & Leadership',
  'Academic & Religious Faculty',
  'Technical & ICT',
  'Campus Safety & Operations',
  'Food Services & Nutrition',
  'Facilities & Maintenance',
]

export const uploadFieldMeta: Record<string, { label: string; description: string }> = {
  passport: {
    label: 'Passport Photograph',
    description: 'Clear, recent front-facing color passport photo (White or Red background). JPEG/PNG only, max 100MB.',
  },
  cv: {
    label: 'Curriculum Vitae (CV / Resume)',
    description: 'Updated comprehensive resume detailing education and professional experience. PDF or Word doc, max 10MB.',
  },
  degrees_pgde: {
    label: 'Degree & PGDE Certificates',
    description: 'B.Sc/B.Ed and Postgraduate Diploma in Education or Master’s certificate copies.',
  },
  admin_proofs: {
    label: 'Administrative Proof & Testimonials',
    description: 'Official appointment letters, commendations or reference from former school management.',
  },
  academic_certs: {
    label: 'Academic Certifications',
    description: 'B.Sc/HND, OND or secretarial training certificates.',
  },
  degree_diploma: {
    label: 'Degree / Diploma Certificate',
    description: 'B.Sc/HND in Computer Science, IT or related fields.',
  },
  tech_certs: {
    label: 'Technical Certifications',
    description: 'CCNA, CompTIA, AWS, Microsoft or related technical credentials (optional but recommended).',
  },
  degree_nce: {
    label: 'Degree / NCE Certificate',
    description: 'Ph.D, M.Sc, B.Ed, B.Sc or NCE relevant subject certificate.',
  },
  transcripts: {
    label: 'Academic Transcripts',
    description: 'Official academic transcript or statement of results.',
  },
  discharge_service: {
    label: 'Discharge / Service Certificates',
    description: 'Military/Police retirement or discharge testimonial, or professional security license.',
  },
  valid_id: {
    label: 'Valid Government Issued ID',
    description: 'National Identification Number (NIN) slip, Voter’s Card, Driver’s License, or International Passport.',
  },
  ssce_cert: {
    label: 'SSCE / WAEC / NECO Certificate',
    description: 'Senior Secondary Certificate Examination result slip or original certificate.',
  },
  guarantor_form: {
    label: 'Guarantor Letter / Form',
    description: 'Signed guarantor declaration with contact information from a respected community member.',
  },
  food_hygiene: {
    label: 'Food Hygiene & Safety Certificate',
    description: 'Institutional catering hygiene accreditation or trade certification.',
  },
  trade_test: {
    label: 'Trade Test / Catering Diploma',
    description: 'Federal Ministry of Labour Trade Test Grade I/II/III or catering institute certificate.',
  },
  trade_test_ssce: {
    label: 'Trade Test or SSCE Slip',
    description: 'Catering trade test certificate, apprenticeship letter, or SSCE result slip.',
  },
  medical_fitness: {
    label: 'Medical Fitness Certificate',
    description: 'Hospital fitness screening confirming suitability for food handling.',
  },
  fslc_ssce: {
    label: 'FSLC or SSCE Certificate',
    description: 'Primary school leaving certificate or secondary school certificate.',
  },
  nursing_health_certs: {
    label: 'Nursing / Health / Counseling Certs',
    description: 'RN/RM license, Community Health diploma, or counseling degree certificate.',
  },
  quran_cert: {
    label: 'Qur’anic Memorization Certificate (Tahfeez)',
    description: 'Official Ijazah or Tahfeez completion certificate from registered madrasah / markaz.',
  },
  musabaqah_cert: {
    label: 'Musabaqah Award / Participation Proof',
    description: 'Certificate or letter of participation in Qur’an recitation competition.',
  },
  arabic_cert: {
    label: 'Arabic Language Daurah Certificate',
    description: 'Certificate of attendance from intensive Arabic training or institute.',
  },
  salary_slip: {
    label: 'Recent Salary Slip / Proof of Earnings',
    description: 'Most recent pay slip or bank payment advice (PDF/PNG, max 10MB).',
  },
}

export interface InstitutionEntry {
  id: string
  institutionName: string
  customInstitution?: string
  yearGraduated: string
  certificateObtained: string
  dateObtained: string
  certificateFile?: File | string
}

export interface PreviousEmploymentEntry {
  id: string
  companyName: string
  role: string
  startDate: string
  endDate: string
}

export interface HadithTaughtEntry {
  id: string
  bookTitle: string
  institutionHalaqah: string
  location: string
  periodTaught: string
}

export interface RecruitmentFormData {
  // Routing
  position: PositionSlug
  teacherTrack?: 'General' | 'Science' | 'Arts' | 'Tahfeez / Hifzul Wahyain'

  // Section 1: Personal Information
  fullName: string
  phone: string
  gender: 'Male' | 'Female' | ''
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | ''
  dateOfBirth: string
  residentialAddress: string
  nationality: string
  state: string
  lga: string
  passportPhoto?: File | string

  // Section 2: Educational Qualifications & Specialization
  presentQualification: string
  specialization: string

  // Section 3: Teaching Experience (Teacher & Head Teacher)
  hasTaughtBefore: 'Yes' | 'No' | ''
  teachingSchoolName?: string
  teachingSubjects?: string
  teachingDurationValue?: number | string
  teachingDurationUnit?: 'Days' | 'Months' | 'Years'
  heldAdminPosition?: 'Yes' | 'No' | ''
  adminPositionTitle?: string

  // Section 4: Educational Background & Repeatable History
  seniorSecondarySchool: string
  institutionsAttended: InstitutionEntry[]

  // Section 5: Employment Record & Current Status
  isEmployed: 'Yes' | 'No' | ''
  currentEmployer?: string
  currentRank?: string
  monthlySalary?: string
  recentSalarySlip?: File | string
  previousEmployments: PreviousEmploymentEntry[]
  totalYearsOfService?: string

  // Section 6: Academic, Professional & Language Background
  hasProfessionalMembership: 'Yes' | 'No' | ''
  profOrgName?: string
  profOrgRank?: string
  profOrgRegYear?: string

  hasResearchWork: 'Yes' | 'No' | ''
  researchTitle?: string
  researchYear?: string
  researchPublicationYear?: string
  researchPublisher?: string

  hasEnglishCert: 'Yes' | 'No' | ''
  englishCertName?: string
  englishCertYear?: string
  englishCertInstitution?: string

  // Section 7: Administrative Experience (Head Teacher strictly, Teacher optional)
  administeredSchool: 'Yes' | 'No' | ''
  adminRoleHeld?: string
  adminSchoolAddress?: string
  adminState?: string
  adminDuration?: string
  adminStudentPopulation?: number | string

  // Section 8: Mastery of Qur’anic Recitation & Hifz (Tahfeez Track)
  hizbProgress: number // 0 to 60
  hasQuranCertificate: 'Yes' | 'No' | ''
  quranAwardingInstitution?: string
  quranDateOfAward?: string
  quranCertFile?: File | string

  participatedMusabaqah: 'Yes' | 'No' | ''
  musabaqahYear?: string
  musabaqahCategory?: string
  musabaqahPosition?: string
  musabaqahLevel?: 'LGA Level' | 'State Level' | 'National Level' | 'International Level' | ''
  musabaqahCertFile?: File | string

  attendedRecitationDaurah: 'Yes' | 'No' | ''
  daurahHost?: string
  daurahDuration?: string
  daurahDate?: string

  modesOfRecitation: string[]
  otherRiwayah?: string

  // Section 9: Knowledge of Hadith (Hifzul Wahyain & Islamic Faculty)
  hadithBooksStudied: string[]
  otherHadithBook?: string
  hadithBooksTaught: HadithTaughtEntry[]
  attendedHadithDaurah: 'Yes' | 'No' | ''
  hadithDaurahOrg?: string
  hadithDaurahYear?: string
  hadithDaurahDuration?: string

  // Section 10: Arabic Language Proficiency
  speakArabicFluently: 'Yes' | 'No' | ''
  formalArabicQualification: string
  attendedArabicDaurah: 'Yes' | 'No' | ''
  arabicDaurahHost?: string
  arabicDaurahDate?: string
  arabicDaurahCertFile?: File | string

  // Section 11: Document Uploads & Curricula Vitae (CV) Rules
  cvFile?: File | string
  additionalFiles: Record<string, File | string | undefined>
  attested: boolean
  digitalSignature: string
  signatureDate: string
}

export const initialInstitution: InstitutionEntry = {
  id: 'inst-1',
  institutionName: '',
  yearGraduated: '',
  certificateObtained: '',
  dateObtained: '',
}

export const initialEmployment: PreviousEmploymentEntry = {
  id: 'emp-1',
  companyName: '',
  role: '',
  startDate: '',
  endDate: '',
}

export const initialHadithTaught: HadithTaughtEntry = {
  id: 'hadith-1',
  bookTitle: '',
  institutionHalaqah: '',
  location: '',
  periodTaught: '',
}

export const initialFormData: RecruitmentFormData = {
  position: 'teacher',
  teacherTrack: 'General',
  fullName: '',
  phone: '+234',
  gender: '',
  maritalStatus: '',
  dateOfBirth: '',
  residentialAddress: '',
  nationality: 'Nigerian',
  state: 'Jigawa',
  lga: 'Dutse',

  presentQualification: '',
  specialization: '',

  hasTaughtBefore: '',
  teachingSchoolName: '',
  teachingSubjects: '',
  teachingDurationValue: '',
  teachingDurationUnit: 'Years',
  heldAdminPosition: '',
  adminPositionTitle: '',

  seniorSecondarySchool: '',
  institutionsAttended: [initialInstitution],

  isEmployed: '',
  currentEmployer: '',
  currentRank: '',
  monthlySalary: '',
  previousEmployments: [],
  totalYearsOfService: '',

  hasProfessionalMembership: '',
  profOrgName: '',
  profOrgRank: '',
  profOrgRegYear: '',

  hasResearchWork: '',
  researchTitle: '',
  researchYear: '',
  researchPublicationYear: '',
  researchPublisher: '',

  hasEnglishCert: '',
  englishCertName: '',
  englishCertYear: '',
  englishCertInstitution: '',

  administeredSchool: '',
  adminRoleHeld: '',
  adminSchoolAddress: '',
  adminState: 'Jigawa',
  adminDuration: '',
  adminStudentPopulation: '',

  hizbProgress: 0,
  hasQuranCertificate: '',
  quranAwardingInstitution: '',
  quranDateOfAward: '',

  participatedMusabaqah: '',
  musabaqahYear: '',
  musabaqahCategory: '',
  musabaqahPosition: '',
  musabaqahLevel: '',

  attendedRecitationDaurah: '',
  daurahHost: '',
  daurahDuration: '',
  daurahDate: '',

  modesOfRecitation: ["Hafs 'an 'Asim (حفص عن عاصم)"],
  otherRiwayah: '',

  hadithBooksStudied: [],
  otherHadithBook: '',
  hadithBooksTaught: [],
  attendedHadithDaurah: '',
  hadithDaurahOrg: '',
  hadithDaurahYear: '',
  hadithDaurahDuration: '',

  speakArabicFluently: '',
  formalArabicQualification: 'None',
  attendedArabicDaurah: '',
  arabicDaurahHost: '',
  arabicDaurahDate: '',

  additionalFiles: {},
  attested: false,
  digitalSignature: '',
  signatureDate: new Date().toISOString().split('T')[0],
}

// Helpers
export function getPosition(slug: string): PositionSpec {
  return positions.find(p => p.slug === slug) ?? positions[3]
}

export function requiresCv(position: PositionSlug): boolean {
  return getPosition(position).cvRequired
}

export function requiresEducationSection(position: PositionSlug): boolean {
  // Shown for Head Teacher, Secretary, ICT Officer, Teacher, Security Officer, Matron, Kitchen Master
  return [
    'head-teacher',
    'secretary',
    'ict-officer',
    'teacher',
    'security-officer',
    'matron',
    'kitchen-master',
  ].includes(position)
}

export function requiresAcademicRepeatable(position: PositionSlug): boolean {
  return ['head-teacher', 'secretary', 'ict-officer', 'teacher', 'matron'].includes(position)
}

export function requiresTeachingSection(position: PositionSlug): boolean {
  return ['teacher', 'head-teacher'].includes(position)
}

export function requiresEmploymentSection(position: PositionSlug): boolean {
  return !['cleaner', 'gardener'].includes(position)
}

export function requiresProfessionalSection(position: PositionSlug): boolean {
  return ['head-teacher', 'teacher', 'ict-officer', 'secretary'].includes(position)
}

export function requiresAdminSection(position: PositionSlug): boolean {
  return position === 'head-teacher'
}

export function requiresFaithAndHadithSection(position: PositionSlug, track?: string): boolean {
  if (position === 'teacher') return true
  if (position === 'head-teacher') return true
  return false
}

export function generateApplicationReference(position: PositionSlug): string {
  const code = position.replace(/-/g, '').slice(0, 4).toUpperCase()
  const random = Math.floor(100000 + Math.random() * 900000)
  return `ABR-${code}-${random}`
}
