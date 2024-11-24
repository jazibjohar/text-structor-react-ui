import { EngineResponse } from '../../types/template'
import {
  Stack,
} from '@mui/material'
import WorkflowSection from './WorkflowSection'

interface ResultsViewerProps {
  data: EngineResponse
}

// Helper function to find all workflow keys in the object structure
const findWorkflowKeys = (obj: any, parentKey: string = ''): string[] => {
    return Object.entries(obj).reduce((acc: string[], [key, value]: [string, any]) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key
      
      if (value?.workflow) {
        acc.push(currentKey)
      }
      
      if (value && typeof value === 'object') {
        acc.push(...findWorkflowKeys(value, currentKey))
      }
      
      return acc
    }, [])
}

// Get workflow results for a specific path by traversing the results object
const getWorkflowResults = (
  pathSegments: string[], 
  results: any, 
  titles: any
): any => {
  return pathSegments.reduce((acc, curr, index) => {
    // Get to the target object first
    const nextLevel = acc?.[curr]
    if (!nextLevel) return undefined

    // On the last segment, create a copy and remove workflow children
    if (index === pathSegments.length - 1) {
      const copy = {...nextLevel}
      const currentTitles = pathSegments.reduce<any>((titleAcc, tcurr) => titleAcc?.[tcurr], titles)
      
      // Remove immediate children that are workflows
      if (currentTitles?.data) {
        Object.keys(copy).forEach(key => {
          if (currentTitles[key]?.workflow) {
            delete copy[key]
          }
        })
      }
      return copy
    }

    return nextLevel
  }, results)
}

// Generate breadcrumb title by getting the title for each path segment
const getBreadcrumbTitle = (pathSegments: string[], titles: any): string => {
  return pathSegments.map((segment, index) => {
    const segmentPath = pathSegments.slice(0, index + 1)
    const segmentTitles = segmentPath.reduce<any>((acc, curr) => acc?.[curr], titles)
    return segmentTitles?.workflow || segment
  }).join(' > ')
}

export default function ResultsViewer({ data }: ResultsViewerProps) {
  const { results, titles } = data
  const allWorkflows = findWorkflowKeys(titles)

  const renderWorkflowsByPath = (workflowPath: string) => {
    const pathSegments = workflowPath.split('.')
    const workflowResults = getWorkflowResults(pathSegments, results, titles)
    const workflowTitles = pathSegments.reduce<any>((acc, curr) => acc?.[curr], titles)

    if (workflowTitles?.workflow && workflowResults) {
      const breadcrumbTitle = getBreadcrumbTitle(pathSegments, titles)

      return (
        <WorkflowSection
          key={workflowPath}
          title={breadcrumbTitle}
          data={workflowResults}
          titles={workflowTitles}
          path={workflowPath}
        />
      )
    }
    return null
  }

  return (
    <Stack spacing={2}>
      {allWorkflows.map(renderWorkflowsByPath)}
    </Stack>
  )
}
