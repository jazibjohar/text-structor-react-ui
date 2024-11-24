import ObjectTableRenderer from './ObjectTableRenderer'
import StringListRenderer from './StringListRenderer'

interface ListRendererProps {
  title: string
  data: any[]
}

export default function ListRenderer({ title, data }: ListRendererProps) {
  const isObjectList = data.length > 0 && typeof data[0] === 'object'
  
  if (isObjectList) {
    return <ObjectTableRenderer data={data} />
  }

  return <StringListRenderer title={title} data={data as string[]} />
} 