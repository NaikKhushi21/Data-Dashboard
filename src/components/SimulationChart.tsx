import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SimulationChart = ({ simulationResults }: { simulationResults: number[] }) => {
  const chartRef = useRef<ChartJS<"line"> | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (!simulationResults || simulationResults.length === 0) {
    return <p>No simulation data available.</p>;
  }

  const data: ChartData<"line"> = {
    labels: Array.from({ length: simulationResults.length }, (_, i) => `Run ${i + 1}`),
    datasets: [
      {
        label: "Simulated ROI (%)",
        data: simulationResults,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: false,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Simulation Runs" } },
      y: { title: { display: true, text: "ROI (%)" } },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Line ref={chartRef as any} data={data} options={options} />
    </div>
  );
};

export default SimulationChart;
