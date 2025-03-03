import React, { useEffect, useRef, MutableRefObject } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueExpensesChart = ({ monthlyRentalIncome, operatingExpenses }: { monthlyRentalIncome: number; operatingExpenses: number }) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current?.destroy();
      }
    };
  }, []);

  const data = {
    labels: ["Revenue", "Operating Expenses"],
    datasets: [
      {
        label: "Amount ($)",
        data: [monthlyRentalIncome * 12, operatingExpenses],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "300px" }}>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default RevenueExpensesChart;
