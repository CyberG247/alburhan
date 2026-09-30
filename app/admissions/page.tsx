import { AdmissionPortal } from '@/components/admission/AdmissionPortal'

export const metadata = { title: 'Online Admissions | Al-Burhan Academy', description: 'Apply online to Al-Burhan Academy general admissions or the Hifzul Wahyain one-year intensive fellowship.' }

export default function AdmissionsPage() {
  return <main className="min-h-screen bg-[#f8fafc] text-[#0a0a0a]"><div className="bg-[#0b1e3d] px-5 py-4 text-white"><div className="mx-auto flex max-w-6xl items-center justify-between"><a href="/" className="flex items-center gap-3"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K5gmvm7cTVsDIz6pp1Q55IbHWUfZzo.png" alt="Al-Burhan Academy logo" className="h-11 w-11 rounded-full bg-white object-contain p-1" /><span className="font-serif text-lg font-bold">Al-Burhan Academy</span></a><span className="hidden text-sm text-slate-300 sm:block">Online Admission Portal</span></div></div><div className="px-5 py-10 sm:py-14"><AdmissionPortal /></div><footer className="border-t border-slate-200 px-5 py-6 text-center text-xs text-slate-500">Need help? Call +234 906 401 5827 · Ringim, Jigawa State</footer></main>
}
