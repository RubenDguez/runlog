import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  setExpandedAcordrion,
  toogleAccordion,
} from "../../../features/app/appSlice";
import { useGetAllQuery } from "../../../features/run/runDTOSlice";
import { IRunStateDTO } from "../../../types";
import { Switch } from "../../UI/common";
import { Loader } from "../../UI/Loader";
import { NoData } from "../../UI/NoData";
import { Table } from "./Table";

interface IRunByWeek {
  year?: number;
  week?: number;
}

export const Runs = ({ year = 0, week = 0 }: IRunByWeek) => {
  const { data, isLoading, isError } = useGetAllQuery();
  const expandAccordion = useAppSelector((state) => state.app.expandAccordion);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [descOrder, setDescOrder] = useState(true);

  const handleTootleSorting = useCallback(() => {
    setDescOrder(!descOrder);
  }, [descOrder]);

  const handleToogleExpandAccordion = useCallback(() => {
    dispatch(toogleAccordion());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setExpandedAcordrion(true));
  }, [dispatch]);

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
  if (isError) navigate("/error");

  return (
    <>
      <Paper elevation={1} sx={{ padding: "0.25rem 1rem" }}>
        <Switch
          label={expandAccordion ? "Collapse All" : "Expand All"}
          checked={expandAccordion}
          onClick={handleToogleExpandAccordion}
        />
        <Switch
          label={`Sorting: ${descOrder ? "DESC" : "ASC"}`}
          checked={descOrder}
          onClick={handleTootleSorting}
        />
      </Paper>
      {years
        .sort((a, b) => (descOrder ? b - a : a - b))
        .map((feyear) =>
          weeks
            .sort((a, b) => (descOrder ? b - a : a - b))
            .map((feweek) => {
              let newData: IRunStateDTO[] = data!.filter(
                (f) => f.year === feyear && f.weekNumber === feweek
              );
              if (newData.length > 0)
                return (
                  <Box key={`${feweek}${feyear}`}>
                    <Table
                      title={`Year: ${feyear} - Week: ${feweek}`}
                      rows={newData}
                    />
                  </Box>
                );
              return null;
            })
        )}
    </>
  );
};
