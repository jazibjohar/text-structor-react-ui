import 'reactflow/dist/style.css'

import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  Position
} from 'reactflow'

import { useMemo } from 'react'
import { useTemplate } from '../../contexts/TemplateContext'

export default function WorkflowGraph() {
  const { template } = useTemplate()

  const { nodes, edges } = useMemo(() => {
    if (!template.workflow) return { nodes: [], edges: [] }

    const workflowIds = Object.keys(template.workflow)
    const nodes: Node[] = workflowIds.map((id, index) => ({
      id,
      type: 'default',
      data: { 
        label: (
          <div className="text-center">
            <div className="font-bold">{template.workflow![id].name}</div>
            <div className="text-xs">
              {template.workflow![id].data?.length || 0} fields
            </div>
          </div>
        )
      },
      position: {
        x: (index % 3) * 200 + 50,
        y: Math.floor(index / 3) * 100 + 50
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    }))

    const edges: Edge[] = workflowIds.flatMap(id => 
      (template.workflow![id].requires || []).map((target: string) => ({
        id: `${id}-${target}`,
        source: target,
        target: id,
        type: 'smoothstep',
        animated: true
      }))
    )

    return { nodes, edges }
  }, [template.workflow])

  if (!template.workflow || Object.keys(template.workflow).length === 0) {
    return (
      <div className="border rounded-lg p-4 text-center text-gray-500">
        No workflow steps defined
      </div>
    )
  }
  console.log({
    nodes,
    edges
  })

  return (
    <div className="border rounded-lg" style={{ height: 400 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
} 