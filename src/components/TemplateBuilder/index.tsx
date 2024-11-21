import { Box, Stack } from '@mui/material';

import DataEditor from '../DataEditor';
import Grid from '@mui/material/Grid';
import ImportButton from '../ImportButton';
import JsonPreview from '../JsonPreview';
import ValidationErrors from '../ValidationErrors';
import WorkflowEditor from '../WorkflowEditor';
import WorkflowGraph from '../WorkflowGraph';
import { useTemplate } from '../../contexts/TemplateContext';

export default function TemplateBuilder() {
  const { errors } = useTemplate();

  return (
    <Box>
      <ValidationErrors errors={errors} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 2
        }}
      >
        <ImportButton />
      </Box>

      <Grid container spacing={2} component="div">
        <Grid xs={12} md={6} component="div">
          <Stack spacing={2}>
            <DataEditor />
            <WorkflowEditor />
          </Stack>
        </Grid>
        <Grid xs={12} md={6} component="div">
          <Stack spacing={2}>
            <WorkflowGraph />
            <JsonPreview />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
