import { Box, Grid, Paper, Stack, Switch, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setExpandedAccordion,
  toggleAccordion,
} from "../../../store/features/app/appSlice";
import { IRunStateDTO } from "../../../types";
import { Loader } from "../../UI/Loader";
import { NoData } from "../../UI/NoData";
import { Table } from "./Table";
import { Fab } from "../../UI/common";

interface IRunByWeek {
  year?: number;
  week?: number;
}

export const Runs = ({ year = 0, week = 0 }: IRunByWeek) => {
  const data = useAppSelector((state) => state.runList);
  const expandAccordion = useAppSelector((state) => state.app.expandAccordion);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [descOrder, setDescOrder] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleTootleSorting = useCallback(() => {
    setDescOrder(!descOrder);
  }, [descOrder]);

  const handleToggleExpandAccordion = useCallback(() => {
    dispatch(toggleAccordion());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setExpandedAccordion(true));
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) setIsLoading(false);
  }, [data]);

  // * If no year and/or week has been set, we will get
  // * all years and weeks available in database
  let years: number[] = [];
  let weeks: number[] = [];

  if (year > 0) years.push(year);
  if (week > 0) weeks.push(week);

  // * when only year is set, then selecting every week available in database
  if (week === 0 && year !== 0) {
    weeks = Array.from(
      new Set(data?.filter((f) => f.year === year).map((m) => m.weekNumber))
    );
  }

  // * when only week is set, then selecting every year available in database
  if (week !== 0 && year === 0) {
    years = Array.from(
      new Set(data?.filter((f) => f.weekNumber === week).map((m) => m.year))
    );
  }

  // * When no year or week has being set, then electing all years and weeks available in database
  if (year === 0 && week === 0) {
    years = Array.from(new Set(data?.map((m) => m.year)));
    weeks = Array.from(new Set(data?.map((m) => m.weekNumber)));
  }

  // * verifying data availability
  if (
    (year > 0 && data?.filter((f) => f.year === year).length === 0) ||
    (week > 0 && data?.filter((f) => f.weekNumber === week).length === 0) ||
    (year > 0 &&
      week > 0 &&
      data?.filter((f) => f.year === year && f.weekNumber === week).length ===
        0)
  )
    return <NoData />;
  if (isLoading) return <Loader />;

  return (
    <>
      {(!year || !week) && (
        <Paper
          elevation={1}
          sx={{
            padding: "0.25rem 1rem",
            marginBottom: "8px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="caption">COLLAPSED</Typography>
                <Switch
                  size="small"
                  checked={expandAccordion}
                  onClick={handleToggleExpandAccordion}
                />
                <Typography variant="caption">EXPANDED</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="caption">ASC</Typography>
                <Switch
                  size="small"
                  checked={descOrder}
                  onClick={handleTootleSorting}
                />
                <Typography variant="caption">DESC</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}

      {years
        .sort((a, b) => (descOrder ? b - a : a - b))
        .map((mapYear) =>
          weeks
            .sort((a, b) => (descOrder ? b - a : a - b))
            .map((mapWeek) => {
              let newData: IRunStateDTO[] = data!.filter(
                (f) => f.year === mapYear && f.weekNumber === mapWeek
              );
              if (newData.length > 0)
                return (
                  <Box key={`${mapWeek}${mapYear}`}>
                    <Table
                      title={`YEAR: ${mapYear} - WEEK: ${mapWeek}`}
                      rows={newData}
                    />
                  </Box>
                );
              return null;
            })
        )}
      <Fab action={() => navigate("/authorized/run-form")}>
        <AddIcon sx={{ fontSize: "3rem" }} />
      </Fab>
    </>
  );
};
