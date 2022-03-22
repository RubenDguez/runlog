import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Loader } from "./Loader";
import { Container } from "@mui/material";
import { useAppSelector } from "../../store/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Run Log Chart",
    },
  },
};

export interface IChartData {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      borderWidth: number;
    }
  ];
}

export const Chart = () => {
  const data = useAppSelector((state) => state.runList);
  const [isLoading, setIsLoading] = useState(true);

  const chartData = useMemo(() => {
    if (data) {
      let years: number[] = Array.from(new Set(data?.map((m) => m.year)));
      let weeks: number[] = Array.from(new Set(data?.map((m) => m.weekNumber)));

      let weekLoadedMiles: number[] = [];
      let weekEmptyMiles: number[] = [];
      let totalMiles: number[] = [];
      let labels: string[] = [];

      years.forEach((feYear) => {
        weeks.forEach((feWeek) => {
          let sum = 0;
          let weekLoaded = 0;
          let weekEmpty = 0;
          data
            .filter((f) => f.year === feYear && f.weekNumber === feWeek)
            .forEach((feData) => {
              sum += feData.emptyMiles + feData.loadedMiles;
              weekLoaded += feData.loadedMiles;
              weekEmpty += feData.emptyMiles;
            });
          totalMiles.push(sum);
          weekLoadedMiles.push(weekLoaded);
          weekEmptyMiles.push(weekEmpty);
          labels.push(`${feWeek}`);
        });
      });

      return {
        labels: labels,
        datasets: [
          {
            label: "Total miles",
            data: totalMiles,
            borderColor: "rgba(64,224,208, 0.20)",
            backgroundColor: "rgba(64,224,208, 0.20)",
            borderWidth: 1,
          },
          {
            label: "Loaded Miles",
            data: weekLoadedMiles,
            borderColor: "rgba(64,224,208, 0.50)",
            backgroundColor: "rgba(64,224,208, 0.50)",
            borderWidth: 1,
          },
          {
            label: "Empty Miles",
            data: weekEmptyMiles,
            borderColor: "rgba(64,224,208, 0.80)",
            backgroundColor: "rgba(64,224,208, 0.80)",
            borderWidth: 1,
          },
        ],
      };
    }
  }, [data]);

  useEffect(() => {
    if (data.length > 0) setIsLoading(false);
  }, [data]);

  if (isLoading) return <Loader />;
  return (
    <>
      {chartData && (
        <Container maxWidth="lg">
          <Line data={chartData} options={options} />
        </Container>
      )}
    </>
  );
};
