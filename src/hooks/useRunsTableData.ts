import { useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { IRunStateDTO } from "../types";

export const useRunsTableData = (year: number = 0, week: number = 0) => {
  const [data, descOrder] = useAppSelector((state) => [
    state.runList,
    state.app.descendingOrder,
  ]);

  const yearsweek = useMemo(() => {
    const isLoading = !data;

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

    const tableData: {
      title: string;
      rows: IRunStateDTO[];
    }[] = [];

    years
      .sort((a, b) => (descOrder ? b - a : a - b))
      .map((mapYear) =>
        weeks
          .sort((a, b) => (descOrder ? b - a : a - b))
          .map((mapWeek) => {
            let newData: IRunStateDTO[] = data!.filter(
              (f) => f.year === mapYear && f.weekNumber === mapWeek
            );
            if (newData.length > 0)
              tableData.push({
                title: `YEAR: ${mapYear} - WEEK: ${mapWeek}`,
                rows: newData,
              });
            return null;
          })
      );

    // * verifying data availability
    const isDataAvailable = !(
      (year > 0 && data?.filter((f) => f.year === year).length === 0) ||
      (week > 0 && data?.filter((f) => f.weekNumber === week).length === 0) ||
      (year > 0 &&
        week > 0 &&
        data?.filter((f) => f.year === year && f.weekNumber === week).length ===
          0)
    );

    return { tableData, isLoading, isDataAvailable };
  }, [data, year, week, descOrder]);

  return { ...yearsweek };
};
