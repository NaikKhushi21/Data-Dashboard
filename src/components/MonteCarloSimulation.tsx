import React, { useState, useEffect, useRef } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";
import { Proforma } from "../types";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);



const MonteCarloSimulation: React.FC<{ proforma: Proforma }> = ({ proforma }) => {
  const [simulationResults, setSimulationResults] = useState<number[]>([]);
  const chartRef = useRef<Chart | null>(null);

  // Function to run Monte Carlo Simulation
  const runSimulation = () => {
    const numSimulations = 500;
    const simulatedROIs = [];

    for (let i = 0; i < numSimulations; i++) {
      const randomFactor = 1 + (Math.random() * 0.1 - 0.05); // ±5% variation
      const simulatedROI = proforma.roi * randomFactor;
      simulatedROIs.push(simulatedROI);
    }

    setSimulationResults(simulatedROIs);
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("monteCarloChart") as HTMLCanvasElement;
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array(simulationResults.length).fill("").map((_, i) => i + 1),
          datasets: [
            {
              label: "Simulated ROI",
              data: simulationResults,
              borderColor: "blue",
              borderWidth: 1,
              pointRadius: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, 
          scales: {
            y: { beginAtZero: false },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [simulationResults]);

  return (
    <Box textAlign="center">
      <Button variant="contained" onClick={runSimulation} sx={{ mb: 2 }}>
        RUN SIMULATION
      </Button>
      <Box sx={{ height: "240px", overflow: "hidden" }}>
        <canvas id="monteCarloChart"></canvas>
      </Box>
    </Box>
  );
};

export default MonteCarloSimulation;
