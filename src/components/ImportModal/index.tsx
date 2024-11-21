import { useRef, useState } from 'react'

import { useTemplate } from '../../contexts/TemplateContext'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ImportModal({ isOpen, onClose }: ImportModalProps) {
  const [jsonText, setJsonText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { updateTemplate } = useTemplate()

  const handleImport = () => {
    try {
      const templateData = JSON.parse(jsonText)
      updateTemplate(templateData)
      onClose()
    } catch (error) {
      alert('Invalid JSON format')
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setJsonText(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Import Template JSON</h2>
        <div className="space-y-4">
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full h-64 p-2 border rounded"
            placeholder="Paste your JSON here..."
          />
          <div className="flex gap-4">
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Upload File
            </button>
            <button
              onClick={handleImport}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Import
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 