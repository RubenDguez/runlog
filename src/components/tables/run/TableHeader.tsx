import { TableCell as TC, TableCellProps, TableRow } from "@mui/material";
import { useTheme } from "@mui/system";

export const TableHeader = () => {
  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell>Load Number</TableCell>
      <TableCell>Pick up Location</TableCell>
      <TableCell>Drop off Location</TableCell>
      <TableCell>Pick up date</TableCell>
      <TableCell>Drop off date</TableCell>
      <TableCell>Second Load</TableCell>
      <TableCell align="right">Loaded miles</TableCell>
      <TableCell align="right">Empty miles</TableCell>
      <TableCell align="right">Loaded Cash</TableCell>
      <TableCell align="right">Empty Cash</TableCell>
      <TableCell align="right">Extras</TableCell>
      <TableCell align="right">Total Trip</TableCell>
    </TableRow>
  );
};

const TableCell = ({ children, ...rest }: TableCellProps) => {
  const theme = useTheme();
  return (
    <TC {...rest} sx={{ color: theme.palette.text.secondary }}>
      {children}
    </TC>
  );
};
