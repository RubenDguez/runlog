import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useChartData } from "../../hooks/useChartData";
import { Loader } from "./Loader";

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
  const { chartData, isLoading } = useChartData();

  if (isLoading) return <Loader />;
  return (
    <>
      {chartData && (
        <Line
          style={{ height: "100%", width: "100%" }}
          data={chartData}
          options={options}
        />
      )}
    </>
  );
};
