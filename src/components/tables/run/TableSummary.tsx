import { TableCell as TC, TableCellProps, TableRow } from "@mui/material";
import { ReactNode } from "react";
import { toCurrency, toLocalString } from "../../../utils";
import { useTheme } from "@mui/system";

export interface IStatData {
  totalLoadedMiles: number;
  totalEmptyMiles: number;
  totalLoadedCash: number;
  totalEmptyCash: number;
  totalExtras: number;
  totalTrip: number;
}

interface IStats {
  data: IStatData;
}

export const TableSummary = ({ data }: IStats) => {
  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell align="right">
        {toLocalString(data.totalLoadedMiles)}
      </TableCell>
      <TableCell align="right">{toLocalString(data.totalEmptyMiles)}</TableCell>
      <TableCell align="right">{toCurrency(data.totalLoadedCash)}</TableCell>
      <TableCell align="right">{toCurrency(data.totalEmptyCash)}</TableCell>
      <TableCell align="right">{toCurrency(data.totalExtras)}</TableCell>
      <TableCell align="right" sx={{ color: "gray" }}>
        {toCurrency(data.totalTrip)}
      </TableCell>
    </TableRow>
  );
};

interface ITableCell extends TableCellProps {
  children?: ReactNode;
}

const TableCell = ({ children, ...rest }: ITableCell) => {
  const theme = useTheme();
  return (
    <TC
      {...rest}
      sx={{
        borderBottom: "none",
        color: theme.palette.success.main,
        fontStyle: "italic",
      }}
    >
      {children}
    </TC>
  );
};
