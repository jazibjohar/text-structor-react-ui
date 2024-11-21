import ImportModal from '../ImportModal'
import { useState } from 'react'

export default function ImportButton() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsImportModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Import JSON
      </button>

      {isImportModalOpen && (
        <ImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />
      )}
    </>
  )
} 