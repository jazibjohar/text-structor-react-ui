import { Button } from '@mui/material'
import ImportModal from '../ImportModal'
import { useState } from 'react'

export default function ImportButton() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsImportModalOpen(true)}
        variant="contained"
        sx={{
          backgroundColor: '#3b82f6', // equivalent to bg-blue-500
          '&:hover': {
            backgroundColor: '#2563eb', // equivalent to bg-blue-600
          },
          px: 2, // equivalent to px-4
          py: 1, // equivalent to py-2
        }}
      >
        Import JSON
      </Button>

      {isImportModalOpen && (
        <ImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />
      )}
    </>
  )
} 