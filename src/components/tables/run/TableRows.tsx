import {
  IconButton,
  TableCell as TC,
  TableCellProps,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { IRunStateDTO } from "../../../types";
import { toCurrency, toLocalString } from "../../../utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { useNavigate } from "react-router-dom";

interface Idata {
  data: IRunStateDTO;
}

export const TableRows = ({ data }: Idata) => {
  const navigate = useNavigate();
  return (
    <TableRow>
      <TableCell>
        <IconButton
          size="small"
          onClick={() => {
            navigate(`/runform/${data.id}`);
          }}
        >
          <FileOpenIcon fontSize="small" />
        </IconButton>
      </TableCell>
      <TableCell>{data.loadNumber}</TableCell>

      <TableCell>{data.pickUpLocation}</TableCell>
      <TableCell>{data.dropOffLocation}</TableCell>

      <TableCell>{moment(data.pickUpDate).format("MMM DD YYYY")}</TableCell>
      <TableCell>{moment(data.dropOffDate).format("MMM DD YYYY")}</TableCell>
      <TableCell align="center">
        {data.secondLoad && <CheckCircleIcon fontSize="small" />}
      </TableCell>
      <ColoredTableCell align="right">
        {toLocalString(data.loadedMiles)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {toLocalString(data.emptyMiles)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {toCurrency(data.loadedCash)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {toCurrency(data.emptyCash)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {toCurrency(data.extras)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {toCurrency(data.totalTrip)}
      </ColoredTableCell>
    </TableRow>
  );
};

const TableCell = ({ children, ...rest }: TableCellProps) => {
  return <TC {...rest}>{children}</TC>;
};

const ColoredTableCell = ({ children, ...rest }: TableCellProps) => {
  return <TC {...rest}>{children}</TC>;
};
