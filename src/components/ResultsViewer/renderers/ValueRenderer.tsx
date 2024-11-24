import BaseTypeRenderer from './BaseTypeRenderer'
import ListRenderer from './ListRenderer'
import ObjectRenderer from './ObjectRenderer'

type DataType = Record<string, unknown>

export const ValueRenderer = ({ 
  value, 
  title, 
  path, 
  keyName,
}: { 
  value: unknown
  title: string
  path: string
  keyName: string,
}) => {
  if (Array.isArray(value)) {
    return <ListRenderer key={keyName} title={title} data={value} />
  }

  if (typeof value === 'object' && value !== null) {
    return (
      <ObjectRenderer
        key={keyName}
        title={title}
        data={value as DataType}
      />
    )
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return <BaseTypeRenderer key={keyName} label={title} value={value} />
  }

  return <BaseTypeRenderer key={keyName} label={title} value={String(value)} />
} 