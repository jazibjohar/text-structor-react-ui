import { useTemplate } from '../../contexts/TemplateContext'

export default function JsonPreview() {
  const { template } = useTemplate()

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(template, null, 2))
  }

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-engine.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="border rounded-lg p-4 relative">
      <h2 className="text-xl font-bold mb-4">JSON Preview</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
        {JSON.stringify(template, null, 2)}
      </pre>
      <button
        onClick={handleDownload}
        className="absolute bottom-6 right-16 p-2 bg-white hover:bg-gray-100 rounded-md transition-colors border shadow-sm"
        title="Download JSON"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
      <button
        onClick={handleCopy}
        className="absolute bottom-6 right-6 p-2 bg-white hover:bg-gray-100 rounded-md transition-colors border shadow-sm"
        title="Copy to clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </button>
    </div>
  )
} 