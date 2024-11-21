export type AttributeValue = string | [string] | [{ [key: string]: any }] | { [key: string]: any };

export interface DataField {
  name: string;        
  description: string;
  prompt: string;
  type: 'string' | 'numeric' | 'list' | 'object';
  attributes?: Record<string, AttributeValue>;
}

export interface WorkflowStep {
  name: string;
  description: string;
  prompt?: string;
  explain?: string;
  requires?: string[];
  data?: string[];
}

export interface Template {
  data: Record<string, DataField>;
  workflow?: Record<string, WorkflowStep>;
}

export interface ValidationError {
  type: 'data' | 'workflow' | 'dependency';
  path: string;
  message: string;
  severity: 'error' | 'warning';
} 