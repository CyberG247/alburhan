'use client'

import { useRef, useState } from 'react'
import { CheckCircle2, FileText, UploadCloud, X } from 'lucide-react'
import { FileField, fileLabels, fileLimits } from '@/types/admission'

interface Props { name: FileField; value?: File; onChange: (file?: File) => void; required?: boolean }
export function FileUploadField({ name, value, onChange, required }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const accept = name === 'passportPhoto' ? 'image/jpeg,image/png' : 'image/jpeg,image/png,application/pdf'
  const choose = (file?: File) => {
    setError('')
    if (!file) return
    if (!accept.split(',').includes(file.type)) return setError('Use JPEG, PNG or PDF as indicated.')
    if (file.size > fileLimits[name] * 1024 * 1024) return setError(`File must be under ${fileLimits[name]}MB.`)
    onChange(file)
  }
  return <div><div className={`rounded-xl border-2 border-dashed p-4 transition ${value ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}`} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); choose(e.dataTransfer.files[0]) }}><input ref={inputRef} type="file" accept={accept} className="sr-only" onChange={e => choose(e.target.files?.[0])} /><div className="flex items-center gap-3"><div className="rounded-lg bg-white p-2 text-[#1e3a8a]"><UploadCloud className="h-5 w-5" /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-[#0b1e3d]">{fileLabels[name]} {required && <span className="text-[#c8102e]">*</span>}</p>{value ? <p className="flex items-center gap-1 truncate text-xs text-emerald-700"><CheckCircle2 className="h-3 w-3" />{value.name}</p> : <p className="text-xs text-slate-500">Drag and drop or <button type="button" className="font-semibold text-[#1e3a8a] underline" onClick={() => inputRef.current?.click()}>browse</button> · Max {fileLimits[name]}MB</p>}</div>{value && <button type="button" className="rounded-full p-1 text-slate-500 hover:bg-white" onClick={() => onChange(undefined)} aria-label={`Remove ${fileLabels[name]}`}><X className="h-4 w-4" /></button>}</div></div>{error && <p className="mt-1 flex items-center gap-1 text-xs text-[#c8102e]"><FileText className="h-3 w-3" />{error}</p>}</div>
}
                    
