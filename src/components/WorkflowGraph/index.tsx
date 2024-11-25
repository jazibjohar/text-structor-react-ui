import 'reactflow/dist/style.css'

import { Box, Paper, Typography } from '@mui/material'
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
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              {template.workflow![id].name}
            </Typography>
            <Typography variant="caption">
              {template.workflow![id].data?.length || 0} fields
            </Typography>
          </Box>
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
      <Paper 
        sx={{ 
          p: 2, 
          textAlign: 'center',
          color: 'text.secondary'
        }}
      >
        No workflow steps defined
      </Paper>
    )
  }

  return (
    <Paper 
      sx={{ 
        height: 400,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </Paper>
  )
} 