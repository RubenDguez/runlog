import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRunsTableData } from "../../../hooks/useRunsTableData";
import { Fab } from "../../UI/common";
import { Loader } from "../../UI/Loader";
import { NoData } from "../../UI/NoData";
import { Options } from "./Options";
import { Table } from "./Table";

interface IRunByWeek {
  year?: number;
  week?: number;
}

export const Runs = ({ year, week }: IRunByWeek) => {
  const navigate = useNavigate();
  const { tableData, isLoading, isDataAvailable } = useRunsTableData(
    year,
    week
  );

  if (!isDataAvailable) return <NoData />;
  if (isLoading) return <Loader />;

  return (
    <>
      {(!year || !week) && <Options />}
      {tableData.map((m) => (
        <Box key={m.title}>
          <Table
            title={m.title}
            rows={m.rows}
            expand={year && week ? true : null}
          />
        </Box>
      ))}
      <Fab action={() => navigate("/authorized/run-form")}>
        <AddIcon sx={{ fontSize: "3rem" }} />
      </Fab>
    </>
  );
};
