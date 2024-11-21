import DataEditor from '../DataEditor';
import ImportButton from '../ImportButton';
import JsonPreview from '../JsonPreview';
import ValidationErrors from '../ValidationErrors';
import WorkflowEditor from '../WorkflowEditor';
import WorkflowGraph from '../WorkflowGraph';
import { useTemplate } from '../../contexts/TemplateContext';

export default function TemplateBuilder() {
  const { errors } = useTemplate();

  return (
    <>
      <ValidationErrors errors={errors} />
      <div className='flex justify-between items-center mb-4 mt-2'>
        <ImportButton />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-4'>
          <DataEditor />
          <WorkflowEditor />
        </div>
        <div className='space-y-4'>
          <WorkflowGraph />
          <JsonPreview />
        </div>
      </div>
    </>
  );
}
