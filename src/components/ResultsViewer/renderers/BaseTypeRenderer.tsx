import { Typography } from '@mui/material';

interface BaseTypeRendererProps {
  label: string;
  value: string | number;
}

const LongTextRenderer = ({ label, value }: BaseTypeRendererProps) => (
  <>
    <Typography 
      component="h2" 
      variant="subtitle1" 
      color="primary.main"
      sx={{ 
        mb: 1.5,
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: '0.875rem',
        letterSpacing: '0.1em'
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: '0.9rem',
        lineHeight: 1.75,
        wordBreak: 'break-word',
        pl: 2,
        borderLeft: '3px solid',
        borderColor: 'primary.light',
        color: 'text.primary'
      }}
    >
      {value}
    </Typography>
  </>
);

const ShortTextRenderer = ({ label, value }: BaseTypeRendererProps) => (
  <Typography 
    sx={{ 
      display: 'flex', 
      alignItems: 'baseline', 
      gap: 2,
      py: 1,
    }}
  >
    <Typography 
      component="span"
      variant="subtitle2" 
      color="text.secondary"
      sx={{ 
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.1em'
      }}
    >
      {label}:
    </Typography>
    <Typography
      component="span"
      sx={{
        fontSize: '0.9rem',
        lineHeight: 1.5,
        wordBreak: 'break-word',
        color: 'text.primary',
        flex: 1
      }}
    >
      {value}
    </Typography>
  </Typography>
);

export default function BaseTypeRenderer({ label, value }: BaseTypeRendererProps) {
  const isLongText = typeof value === 'string' && value.length > 100;

  return (
    <>
      {isLongText ? (
        <LongTextRenderer label={label} value={value} />
      ) : (
        <ShortTextRenderer label={label} value={value} />
      )}
    </>
  );
} 