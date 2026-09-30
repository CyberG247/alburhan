import { z } from 'zod'

const requiredText = (label: string) => z.string().trim().min(1, `${label} is required`)
const phone = z.string().regex(/^(\+234|0)[789][01]\d{8}$/, 'Enter a valid Nigerian phone number')

export const admissionSchema = z.object({
  admissionTrack: z.enum(['general', 'hifzul_wahyain']),
  entryLevel: z.string(), secondaryTrack: z.string(), residentialMode: z.enum(['day', 'boarding']),
  priorQuranMemorization: z.string(), hadithBackground: z.string(), arabicProficiencyLevel: z.string(),
  surname: requiredText('Surname'), firstName: requiredText('First name'), otherNames: z.string(), gender: z.enum(['Male', 'Female', '']),
  dateOfBirth: requiredText('Date of birth'), stateOfOrigin: requiredText('State of origin'), lga: requiredText('LGA'), residentialAddress: requiredText('Residential address'), applicantPhone: z.string(), applicantEmail: z.string().email('Enter a valid email').or(z.literal('')),
  guardianName: requiredText('Guardian name'), guardianRelationship: requiredText('Relationship'), guardianPhone: phone, alternatePhone: z.string(), whatsappNumber: z.string(), guardianEmail: z.string().email('Enter a valid email'), occupation: requiredText('Occupation / organization'), guardianTown: requiredText('Guardian town'),
  lastSchool: requiredText('Last school attended'), highestClass: requiredText('Highest class passed'), madrasahExperience: z.enum(['Yes', 'No', '']), madrasahDetails: z.string(), attested: z.literal(true, { message: 'You must certify the information provided' }),
}).superRefine((data, ctx) => {
  if (!data.gender) ctx.addIssue({ code: 'custom', path: ['gender'], message: 'Select a gender' })
  if (data.admissionTrack === 'hifzul_wahyain') {
    if (!data.applicantEmail) ctx.addIssue({ code: 'custom', path: ['applicantEmail'], message: 'Email is required for Hifzul Wahyain applicants' })
    if (data.residentialMode !== 'boarding') ctx.addIssue({ code: 'custom', path: ['residentialMode'], message: 'Full boarding is compulsory for this cohort' })
  }
  if (data.madrasahExperience === 'Yes' && !data.madrasahDetails.trim()) ctx.addIssue({ code: 'custom', path: ['madrasahDetails'], message: 'Describe the previous experience' })
})

export type AdmissionSchema = z.infer<typeof admissionSchema>

export function validateAdmissionStep(data: Record<string, unknown>, step: number) {
  const result = admissionSchema.safeParse(data)
  if (result.success) return {}
  const errors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const key = String(issue.path[0])
    if (!errors[key]) errors[key] = issue.message
  }
  const allowed = [
    ['admissionTrack', 'entryLevel', 'secondaryTrack', 'residentialMode', 'priorQuranMemorization', 'hadithBackground', 'arabicProficiencyLevel'],
    ['surname', 'firstName', 'gender', 'dateOfBirth', 'stateOfOrigin', 'lga', 'residentialAddress', 'applicantPhone', 'applicantEmail'],
    ['guardianName', 'guardianRelationship', 'guardianPhone', 'alternatePhone', 'whatsappNumber', 'guardianEmail', 'occupation', 'guardianTown'],
    ['lastSchool', 'highestClass', 'madrasahExperience', 'madrasahDetails'], [], ['attested'],
  ][step]
  return Object.fromEntries(Object.entries(errors).filter(([key]) => allowed.includes(key)))
}
                    
