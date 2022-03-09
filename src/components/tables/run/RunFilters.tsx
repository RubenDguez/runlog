import { Autocomplete, Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  setExpandedAcordrion,
  setFilterWeek,
  setFilterYear,
} from "../../../features/app/appSlice";
import { useGetAllQuery } from "../../../features/run/runDTOSlice";
import { Runs } from "./Runs";

export const RunFilters = () => {
  const { data } = useGetAllQuery();
  const appState = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const [year, setYear] = useState<string | null>(appState.filterYear);
  const [week, setWeek] = useState<string | null>(appState.filterWeek);

  const yearsOptions = useMemo(() => {
    return Array.from(new Set(data?.map((m) => m.year.toString())));
  }, [data]);

  const weeksOptions = useMemo(() => {
    return Array.from(
      new Set(
        data
          ?.filter((f) => f.year === Number(year))
          .map((m) => m.weekNumber.toString())
      )
    );
  }, [data, year]);

  const handleSetYear = useCallback(
    (value: string | null) => {
      setYear(value);
      dispatch(setFilterYear(value));
    },
    [setYear, dispatch]
  );

  const handleSetWeek = useCallback(
    (value: string | null) => {
      setWeek(value);
      dispatch(setFilterWeek(value));
    },
    [setWeek, dispatch]
  );

  useEffect(() => {
    dispatch(setExpandedAcordrion(false));
  }, [dispatch]);

  useEffect(() => {
    if (year === null || week === null) {
      dispatch(setExpandedAcordrion(false));
    } else dispatch(setExpandedAcordrion(true));
  }, [year, week, dispatch]);

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: "16px" }}>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            options={yearsOptions}
            value={year}
            onChange={(event: any, newValue: string | null) => {
              handleSetYear(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Year" />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            options={weeksOptions}
            value={week}
            onChange={(event: any, newValue: string | null) => {
              handleSetWeek(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Week" />}
          />
        </Grid>
      </Grid>

      <Runs year={Number(year)} week={Number(week)} />
    </>
  );
};
