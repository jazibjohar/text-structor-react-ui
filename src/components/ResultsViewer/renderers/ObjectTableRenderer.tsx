import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';

// Add helper function
const toTitleCase = (str: string) => {
  return str
    .split(/(?=[A-Z])|[_\s]/) // Split on capital letters, underscores, or spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Add styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td': {
    borderBottom: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

interface ObjectTableRendererProps {
  data: Record<string, any>[];
}

export default function ObjectTableRenderer({
  data,
}: ObjectTableRendererProps) {
  const headers = Object.keys(data[0]);

  return (
    <Box sx={{ mb: 3 }}>
      <TableContainer component={Paper} elevation={2}>
        <Table size='small' sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <StyledTableCell key={header}>
                  {toTitleCase(header)}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow key={index}>
                {headers.map((header) => (
                  <StyledTableCell key={header}>{row[header]}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
