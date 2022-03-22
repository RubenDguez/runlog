import { Autocomplete, Grid } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setExpandedAccordion,
  setFilterWeek,
  setFilterYear,
} from "../../../store/features/app/appSlice";
import { TextField } from "../../UI/common";
import { Runs } from "./Runs";

export const RunFilters = () => {
  const data = useAppSelector((state) => state.runList);
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
          .sort((a, b) => b.weekNumber - a.weekNumber)
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
    dispatch(setExpandedAccordion(true));
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: "16px" }}>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            size="small"
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
            size="small"
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
