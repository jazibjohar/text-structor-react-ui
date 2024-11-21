import { ValidationError } from '../..//types/template'

interface ValidationErrorsProps {
  errors: ValidationError[]
}

export default function ValidationErrors({ errors }: ValidationErrorsProps) {
  if (errors.length === 0) return null

  const errorsByType = errors.reduce((acc, error) => {
    acc[error.type] = acc[error.type] || []
    acc[error.type].push(error)
    return acc
  }, {} as Record<string, ValidationError[]>)

  return (
    <div className="space-y-2">
      {Object.entries(errorsByType).map(([type, typeErrors]) => (
        <div key={type} className="border rounded-lg p-4">
          <h3 className="font-bold mb-2">{type} Errors ({typeErrors.length})</h3>
          <ul className="space-y-2">
            {typeErrors.map((error, index) => (
              <li 
                key={index}
                className={`p-2 rounded ${
                  error.severity === 'error' ? 'bg-red-100' : 'bg-yellow-100'
                }`}
              >
                <div className="font-semibold">{error.path}</div>
                <div>{error.message}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
} 