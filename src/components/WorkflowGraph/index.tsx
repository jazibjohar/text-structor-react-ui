import { useEffect, useMemo, useRef } from 'react';

// @ts-ignore
import CytoscapeComponent from 'react-cytoscapejs';
import { Paper } from '@mui/material';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { useTemplate } from '../../contexts/TemplateContext';

// Register the dagre layout
cytoscape.use(dagre);

export default function WorkflowGraph() {
  const { template } = useTemplate()

  const elements = useMemo(() => {
    if (!template.workflow) return { nodes: [], edges: [] }
    
    const nodes = Object.entries(template.workflow).map(([id, workflow]) => ({
      data: { 
        id,
        label: workflow.name,
        fields: workflow.data?.length || 0,
        type: workflow.prompt ? 'prompt' : 'explain'
      }
    }))

    const edges = Object.entries(template.workflow)
      .filter(([_, workflow]) => Array.isArray(workflow.requires))
      .flatMap(([id, workflow]) => 
        workflow.requires!.map(target => ({
          data: {
            id: `${id}-${target}`,
            source: target,
            target: id
          }
        }))
      )

    return [...nodes, ...edges]
  }, [template.workflow])

  const layout = {
    name: 'dagre',
    rankDir: 'LR',
    padding: 50,
    spacingFactor: 1.5,
    rankSep: 200,  // Reduced horizontal spacing
    nodeSep: 80,   // Reduced vertical spacing
    animate: true,
    animationDuration: 500,
    fit: true,
    edgeSep: 50,   // Reduced edge spacing
  }

  const stylesheet = [
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
        'background-color': '#ffffff',
        'border-width': 2,
        'border-color': '#666666',
        'padding': '10px',
        'width': '180px',     // Reduced width
        'height': '60px',     // Reduced height
        'font-size': '14px',  // Slightly smaller font
        'font-weight': 'bold',
        'text-wrap': 'wrap',
        'text-max-width': '160px',  // Adjusted for new width
        'shape': 'round-rectangle',
        'shadow-blur': '5px',       // Reduced shadow
        'shadow-color': '#888',
        'shadow-opacity': 0.2,
        'shadow-offset-x': '0px',
        'shadow-offset-y': '2px',
      }
    },
    {
      selector: 'node[type = "prompt"]',
      style: {
        'border-color': '#2196F3',
        'border-width': 2,
        'background-color': '#E3F2FD'
      }
    },
    {
      selector: 'node[type = "explain"]',
      style: {
        'border-color': '#4CAF50',
        'border-width': 2,
        'background-color': '#E8F5E9'
      }
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'target-arrow-shape': 'vee',
        'arrow-scale': 1.5,    // Slightly smaller arrows
        'line-color': '#666666',
        'target-arrow-color': '#666666',
        'width': 2,            // Thinner edges
        'source-endpoint': 'outside-to-node',
        'target-endpoint': 'outside-to-node',
        'edge-distances': 'node-position',
        'control-point-step-size': 100,
        'control-point-weights': 0.5,
        'control-point-distances': 150,
        'opacity': 0.7
      }
    },
    {
      selector: ':selected',
      style: {
        'background-color': '#fff4e6',
        'line-color': '#FF9800',
        'target-arrow-color': '#FF9800',
        'source-arrow-color': '#FF9800'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'border-color': '#FF9800',
        'border-width': 3
      }
    }
  ]

  // Add ref to store cytoscape instance
  const cyRef = useRef<any>(null);

  // Add effect to run layout when elements change
  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.layout(layout).run();
    }
  }, [elements]);

  return (
    <Paper 
      elevation={2}
      sx={{ 
        width: '100%',
        height: '100%',
        minHeight: '400px',
        p: 2,
        backgroundColor: '#fafafa',
      }}
    >
      <CytoscapeComponent
        cy={(cy) => { cyRef.current = cy; }}
        elements={elements}
        layout={layout}
        stylesheet={stylesheet}
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '400px',
          borderRadius: '8px',
        }}
        zoom={0.9}
        pan={{ x: 50, y: 50 }}
      />
    </Paper>
  )
} 