  
import React, { useState, useRef, useEffect } from "react"
import { Upload as UploadIcon, Paperclip, X } from "lucide-react"
import { Tooltip } from "react-tooltip"
import { AlertCircle } from "lucide-react";  

const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
]
const MAX_FILE_SIZE_MB = 15
const labelClass = "text-[12px] font-medium text-[#1A1A1A]"; 

type NamedDocument = {
  file: File
  name: string
}



type TooltipIconProps = {
  id: string
  content: string
}
export function ErrorMessage({ message }: { message?: string }) {
  const ref = React.useRef<HTMLParagraphElement>(null)
  const fieldRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (!ref.current) return

    // Locate related field
    const container = ref.current.previousElementSibling
    const field =
      container?.querySelector?.('input, select, textarea') ||
      (container as HTMLElement)

    if (!(field instanceof HTMLElement)) return

    fieldRef.current = field

    if (message) {
      // Apply error style
      field.classList.add('border-red-500')
      field.classList.remove('border-[#00AFEF]')
    } else {
      // Restore normal style
      field.classList.remove('border-red-500')
      field.classList.add('border-[#00AFEF]')
    }
  }, [message])

  return (
    <p
      ref={ref}
      className={`mt-1 flex items-center gap-1 text-[11px] font-semibold
        ${message ? 'text-red-600' : 'hidden'}`}
    >
      <AlertCircle size={12} className="shrink-0" />
      <span>{message}</span>
    </p>
  )
}
export function numberToWord(num: number): string {
  const numberWords: { [key: number]: string } = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
  }

  return numberWords[num] || num.toString()
}

export function TooltipIcon({ id, content }: TooltipIconProps) {
  return (
    <>
      <span
        data-tooltip-id={id}
        data-tooltip-content={content}
        className="text-[#00AFEF] text-[11px]  cursor-pointer"
      >
        ⓘ
      </span>

      <Tooltip
        id={id}
        place="top"
        style={{
          fontSize: '11px',
          padding: '6px 10px',
          borderRadius: '6px',
          backgroundColor: '#0f172a',
        }}
      />
    </>
  )
}

  
 export function FileInput({
  label,
  required,
  file,
  onChange,
  borderClass = 'border-[#00AFEF]',
  disabled = false,
  onBeforeSelect,
  existingFiles = [],
}: {
  label: string
  required?: boolean
  file?: File | null
  onChange: (file: File | null) => void
  borderClass?: string
  disabled?: boolean
  onBeforeSelect?: () => boolean
  existingFiles?: string[]
}) {
  const [error, setError] = useState('')
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const handleFileChange = (file: File | null) => {
    if (!file) {
      setError('')
      onChange(null)
      return
    }

    if (file && existingFiles.includes(file.name.toLowerCase())) {
      setError(`File "${file.name}" is already uploaded`)
      return
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only PDF or JPG files are allowed')
      return
    }

    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      setError('File size must be less than 15 MB')
      return
    }

    setError('')
    onChange(file)
  }

  return (
    <div className="space-y-2">
      {/* Label styled same as inputs */}
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input box styled like ShadInput */}
      <div
        className={`h-12 flex items-center rounded-md border border-slate-300 bg-white px-3
        text-slate-900 transition
        focus-within:border-[#3FB8FF] focus-within:ring-1 focus-within:ring-[#3FB8FF]
        ${borderClass}`}
      >
        {!file ? (
          <label
            onClick={e => {
              if (onBeforeSelect && !onBeforeSelect()) {
                e.preventDefault()
                e.stopPropagation()
              }
            }}
            className="flex items-center gap-2 cursor-pointer w-full"
          >
            <UploadIcon
              className="h-5 w-5 text-slate-400"
              strokeWidth={1.5}
            />

            <div className="flex flex-col">
              <span className="text-sm text-slate-900">
                Click to upload
              </span>
              <span className="text-xs text-slate-400">
                PDF / JPG up to 15MB
              </span>
            </div>

            <input
          ref={fileInputRef}
          type="file"
              hidden
              disabled={disabled}
              accept=".pdf,.jpg,.jpeg"
              onChange={e =>
                handleFileChange(e.target.files?.[0] || null)
              }
            />
          </label>
        ) : (
          <div className="flex items-center justify-between w-full text-sm">
            <div className="flex items-center gap-2 truncate">
              <Paperclip className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="truncate max-w-[200px] text-slate-900">
                {file.name}
              </span>
            </div>

       <button
  type="button"
  onClick={() => {

    console.log("Delete clicked")

    handleFileChange(null)

    //  RESET HTML INPUT
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

  }}

  className="text-slate-400 hover:text-red-600 transition-colors"
  aria-label="Remove file"
>
  <X className="h-4 w-4" />
</button>

            {/* <button
              type="button"
              onClick={() => handleFileChange(null)}
              className="text-slate-400 hover:text-red-600 transition-colors"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button> */}
          </div>
        )}
      </div>

      {/* Error message (aligned with inputs) */}
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  )
}
export const isDuplicateFile = (
  file: File,
  uploadedFiles: any,
  multiDocs: any
): boolean => {

  if (!file) return false;

  const fileName = file.name;
  const fileSize = file.size;

  /* CHECK CASE-1 & CASE-2 */

  const singleFiles =
    Object.values(uploadedFiles || {})
      .filter(Boolean);

  const singleMatch =
    singleFiles.some(
      (f: any) =>

        f?.name === fileName &&
        f?.size === fileSize

    );

  /* CHECK CASE-3 */

  const multiFilesList =
    Object.values(multiDocs || {})
      .flat();

  const multiMatch =
    multiFilesList.some(
      (doc: any) =>

        doc?.file?.name === fileName &&
        doc?.file?.size === fileSize

    );

  return singleMatch || multiMatch;

};

    export function MultiFileInput({
      label,
      files,
      maxFiles = 5,
      onChange,
      existingFiles = [],
    }: {
      label: string
      files: NamedDocument[]
      maxFiles?: number
      onChange: (files: NamedDocument[]) => void
       existingFiles?: string[]  
    }) {
      const [error, setError] = useState('')
      const [open, setOpen] = useState(false)
      const [tempFiles, setTempFiles] = useState<File[]>([])
      const fileInputRef = useRef<HTMLInputElement>(null)
      const tooltipId = 'other-docs-tooltip' 
      const [popupError, setPopupError] = useState('')
      const [documentName, setDocumentName] = useState('')
      const documentNameRef = useRef<HTMLInputElement>(null)
      const [maxLimitError, setMaxLimitError] = useState('')
            

      const handlePopupFileChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const fileList = e.target.files
      if (!fileList || fileList.length === 0) return

      const filesArray = Array.from(fileList)

      //  File type validation
      const invalidType = filesArray.find(
        file => !ALLOWED_TYPES.includes(file.type)
      )
      if (invalidType) {
        setPopupError('Only PDF or JPG files are allowed')
        e.target.value = ''
        return
      }

      //  File size validation
      const oversized = filesArray.find(
        file => file.size / (1024 * 1024) > MAX_FILE_SIZE_MB
      )
      if (oversized) {
        setPopupError('Each file must be less than 15 MB')
        e.target.value = ''
        return
      }

  //  Duplicate check across entire Step 3
  const duplicate = filesArray.find(file =>
    existingFiles.includes(file.name.toLowerCase())
  )

  if (duplicate) {
    setPopupError(`File "${duplicate.name}" is already uploaded`)
    e.target.value = ''
    return
  }

  // Duplicate inside current popup selection
  const duplicateInTemp = filesArray.find(file =>
    tempFiles.some(
      existing => existing.name.toLowerCase() === file.name.toLowerCase()
    )
  )

  if (duplicateInTemp) {
    setPopupError(`File "${duplicateInTemp.name}" is already selected`)
    e.target.value = ''
    return
  }
      //  Valid files
      setPopupError('')
      setTempFiles(filesArray)
    }

    useEffect(() => {
    if (open) {
      setTempFiles([])
      setDocumentName('')
      setPopupError('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [open])


  const addFiles = () => {
  // 1️ Document name required
  if (!documentName.trim()) {
    setPopupError('Please enter document name')
    documentNameRef.current?.focus()
    return
  }

  // Files mandatory
  if (tempFiles.length === 0) {
    setPopupError('Please upload at least one document')
    return
  }

  // Duplicate file check vs existing list
  const existingFileNames = files.map(
    doc => doc.file.name.toLowerCase()
  )
  const existingDocNames = files.map(
  doc => doc.name.toLowerCase()
)

if (existingDocNames.includes(documentName.trim().toLowerCase())) {
  setPopupError('Document with same name has already been uploaded')
  return
}
  
  const invalidType = tempFiles.find(
    file => !ALLOWED_TYPES.includes(file.type)
  )

  if (invalidType) {
    setPopupError('Only PDF or JPG files are allowed')
    return
  }

  // File size validation
  const oversized = tempFiles.find(
    file => file.size / (1024 * 1024) > MAX_FILE_SIZE_MB
  )

  if (oversized) {
    setPopupError('Each file must be less than 15 MB')
    return
  }

  //  Max file count
  if (files.length + tempFiles.length > maxFiles) {
    setPopupError(`Maximum ${maxFiles} documents allowed`)
    return
  }

  //  SUCCESS
  const newDocs: NamedDocument[] = tempFiles.map(file => ({
    file,
    name: documentName.trim(),
  }))

  onChange([...files, ...newDocs])

  setTempFiles([])
  setDocumentName('')
  setPopupError('')
  setOpen(false)
  setMaxLimitError('') 
}



 
  const removeFile = (index: number) => {
  onChange(files.filter((_, i) => i !== index))
  setMaxLimitError('')
}
  return (
    <>
      {/* LABEL + BUTTON */}
      <div className="flex items-center justify-between">
    <label className={`${labelClass} flex items-center gap-1`}>
  {label}

  <span
    data-tooltip-id={tooltipId}
    data-tooltip-content="A maximum of five documents can be uploaded."
    className="text-blue-500 text-[11px] cursor-pointer"
  >
    ⓘ
  </span>
</label>


<Tooltip
  id={tooltipId}
  place="top"
  style={{
    fontSize: '11px',
    padding: '6px 10px',
    borderRadius: '6px',
    backgroundColor: '#0f172a',
  }}
/>

       
      <div className="flex flex-col items-end">
        <button
        type="button"
        onClick={() => {
          if (files.length >= maxFiles) {
            setMaxLimitError('You can upload up to five documents.')
            return
          }

    setMaxLimitError('')
    setPopupError('')
    setOpen(true)
  }}
  className="px-3 py-1.5 rounded text-white text-sm bg-[#00afef]"
>
  Upload
</button>
  </div>
  </div>
    {maxLimitError && (
      <p className="text-[11px] text-red-600 mt-[2px] font-semibold">
        {maxLimitError}
      </p>
    )}
      {/* FILE LIST */}
      <div className="border border-[#00AFEF] rounded bg-white p-3">
        {files.length === 0 ? (
          <p className="text-xs text-gray-400">
            No documents uploaded ({files.length}/{maxFiles})
          </p>
        ) : (
          <div className="space-y-2">
         {files.map((doc, index) => (
  <div
    key={index}
    className="flex items-start justify-between bg-gray-50 rounded px-3 py-2 text-sm"
  >
    <div className="flex gap-2 truncate">
      <Paperclip className="h-4 w-4 text-gray-500 mt-1 shrink-0" />

      <div className="flex flex-col truncate">
        <span className="font-medium text-gray-800 truncate max-w-[220px]">
          {doc.name}
        </span>
        <span className="text-[11px] text-gray-500 truncate max-w-[220px]">
          {doc.file.name}
        </span>
      </div>
    </div>

    <button
      type="button"
      onClick={() => removeFile(index)}
      className="text-gray-400 hover:text-red-600"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
))}

          </div>
        )}
      </div>

      

      {/* POPUP PANEL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
         
            <div className="bg-white rounded-[4px] w-[360px] p-4 border border-[#f1f1f1]">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-[#00AFEF]">
              Upload Documents
            </h3>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
  </div>
           {/* Document Name Input */}
  <div className="flex flex-col gap-1 mb-4">
  <label className={labelClass}>

    Document Name <span className="text-red-500">*</span>
  </label>
  <input
  ref={documentNameRef}
  type="text"
  value={documentName}
   required
    placeholder="Other document name"
  onChange={e => {
    setDocumentName(e.target.value)
    if (popupError) setPopupError('')
  }}
  className="h-12 w-full rounded-md border border-slate-300 bg-white px-3
    text-slate-900 placeholder:text-slate-400
    focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"/>
</div>

{/* BODY – Upload box */}
<div className="border-2 border-dashed border-[#00AFEF] rounded bg-white p-4 transition">
  {/* CLICK AREA (only when no file) */}
  {tempFiles.length === 0 && (
    <div
      className="flex items-center gap-3 cursor-pointer hover:border-blue-400"
      onClick={() => {
        if (!documentName.trim()) {
          setPopupError('Please enter document name first')
          documentNameRef.current?.focus()
          return
        }

        setPopupError('')
        fileInputRef.current?.click()
      }}
    >
      <UploadIcon className="h-6 w-6 text-blue-500" strokeWidth={1.5} />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-800">
          Click to upload documents
        </span>
        <span className="text-xs text-gray-500">
          PDF / JPG up to 15MB
        </span>
      </div>
    </div>
  )}

  {/* FILE PREVIEW (same dashed box) */}
  {tempFiles.map((file, index) => (
    <div
      key={index}
      className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 text-sm"
    >
      <div className="flex gap-2 truncate">
        <Paperclip className="h-4 w-4 text-gray-500 shrink-0" />
        <div className="flex flex-col truncate">
          <span className="font-medium text-gray-800 truncate max-w-[220px]">
            {documentName}
          </span>
          <span className="text-[11px] text-gray-500 truncate max-w-[220px]">
            {file.name}
          </span>
        </div>
      </div>

      {/* ❌ REMOVE FILE */}
      <button
        type="button"
        onClick={() =>
          setTempFiles(prev => prev.filter((_, i) => i !== index))
        }
        className="text-gray-400 hover:text-red-600 transition-colors"
        aria-label="Remove file"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  ))}

  {/* HIDDEN INPUT */}
  <input
    ref={fileInputRef}
    type="file"
    hidden
    multiple
    accept=".pdf,.jpg,.jpeg"
    onChange={handlePopupFileChange}
  />
</div>

{popupError && (
  <p className="text-red-500 text-[11px] mt-2">
    {popupError}
  </p>
)}


  {/* FOOTER */}
  <div className="flex justify-end gap-2 mt-4">
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="px-3 py-1.5 text-sm text-white border rounded bg-[#E62800]"
    >
      Cancel
    </button>

  <button
  type="button"
  onClick={addFiles}
  disabled={tempFiles.length === 0 || !documentName.trim()}
  className="px-3 py-1.5 text-sm rounded bg-[#00afef] text-white disabled:opacity-50"
>
  Save
</button>
  </div>
  </div>
  <Tooltip
  id="doc-name-tooltip"
  place="top"
  style={{
    fontSize: '11px',
    padding: '6px 10px',
    borderRadius: '6px',
    backgroundColor: '#0f172a',
  }}/>
        </div>          
      )}
    </>
  )
}
