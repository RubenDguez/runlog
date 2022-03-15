import {
  Box,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDeleteMutation } from "../../../features/run/runDTOSlice";
import { Tooltip } from "../../UI/common/Tooltip";

interface ITableRows {
  data: IRunStateDTO;
}

export const TableRows = ({ data }: ITableRows) => {
  const navigate = useNavigate();
  const [del] = useDeleteMutation();
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex" }}>
          <Tooltip
            title={`Open load ${data.loadNumber}`}
            placement="top-end"
            arrow
          >
            <IconButton
              size="small"
              onClick={() => {
                navigate(`/run-form/${data.id}`);
              }}
            >
              <FileOpenIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={`Delete load ${data.loadNumber}`}
            placement="top-start"
            arrow
          >
            <IconButton
              color="error"
              size="small"
              onClick={() => {
                del(data.id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
      <TableCell>{data.loadNumber}</TableCell>

      <TableCell>{data.pickUpLocation}</TableCell>
      <TableCell>{data.dropOffLocation}</TableCell>

      <TableCell>
        {moment(data.pickUpDate.substring(0, 10)).format("MMM DD YYYY")}
      </TableCell>
      <TableCell>
        {moment(data.dropOffDate.substring(0, 10)).format("MMM DD YYYY")}
      </TableCell>
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
