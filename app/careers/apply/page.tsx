import { RecruitmentWizard } from '@/components/recruitment/RecruitmentWizard'
import { positions, type PositionSlug } from '@/types/recruitment'
export default async function ApplyPage({ searchParams }: { searchParams: Promise<{ position?: string }> }) { const params = await searchParams; const valid = positions.some(p => p.slug === params.position); const position = (valid ? params.position : 'teacher') as PositionSlug; return <main className="min-h-screen bg-[#f8fafc] px-5 py-10 lg:px-8"><RecruitmentWizard initialPosition={position}/></main> }
