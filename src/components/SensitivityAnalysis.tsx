import React, { useState } from "react";
import { Slider, Card, CardContent, Typography } from "@mui/material";
import { Proforma } from "../types";

interface SensitivityAnalysisProps {
  proforma: Proforma;
}

const SensitivityAnalysis: React.FC<SensitivityAnalysisProps> = ({ proforma }) => {
  const [occupancyRate, setOccupancyRate] = useState<number>(
    Number(proforma?.occupancyRate) || 90
  );
  const [annualRentGrowth, setAnnualRentGrowth] = useState<number>(
    Number(proforma?.annualRentIncreaseRate) || 2
  );
  const [expenseGrowth, setExpenseGrowth] = useState<number>(1.5);

  const monthlyRentalIncome = Number(proforma.monthlyRentalIncome) || 0;
  const maintenanceCosts = Number(proforma.maintenanceCosts) || 0;
  const insuranceCosts = Number(proforma.insuranceCosts) || 0;
  const propertyTaxes = Number(proforma.propertyTaxes) || 0;
  const utilities = Number(proforma.utilities) || 0;
  const reservesForRepairs = Number(proforma.reservesForRepairs) || 0;
  const otherOperatingExpenses = Number(proforma.otherOperatingExpenses) || 0;
  const purchasePrice = Number(proforma.purchasePrice) || 1; // Avoid division by zero

  const adjustedMonthlyRent = monthlyRentalIncome * (1 + annualRentGrowth / 100);
  const annualRevenue = adjustedMonthlyRent * 12 * (occupancyRate / 100);

  const baseExpenses =
    maintenanceCosts + insuranceCosts + propertyTaxes + utilities + reservesForRepairs + otherOperatingExpenses;
  const totalExpenses = baseExpenses * (1 + expenseGrowth / 100);

  const updatedNOI = annualRevenue - totalExpenses;

  let updatedCapRate: string;
  if (updatedNOI <= 0) {
    updatedCapRate = "N/A";
  } else {
    const capRateValue = (updatedNOI / purchasePrice) * 100;
    updatedCapRate = capRateValue.toFixed(2) + "%";
  }

  console.log("Current occupancyRate:", occupancyRate);
  console.log("Current annualRentGrowth:", annualRentGrowth);
  console.log("Current expenseGrowth:", expenseGrowth);
  console.log("Current updatedNOI:", updatedNOI);
  console.log("Current updatedCapRate:", updatedCapRate);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Scenario / Sensitivity Analysis</Typography>

        <Typography>Occupancy Rate: {occupancyRate}%</Typography>
        <Slider
          value={occupancyRate}
          onChange={(e, newValue) => setOccupancyRate(newValue as number)}
          min={70}
          max={100}
          step={1}
          valueLabelDisplay="auto"
        />

        <Typography>Annual Rent Growth: {annualRentGrowth}%</Typography>
        <Slider
          value={annualRentGrowth}
          onChange={(e, newValue) => setAnnualRentGrowth(newValue as number)}
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
        />

        <Typography>Expense Growth: {expenseGrowth}%</Typography>
        <Slider
          value={expenseGrowth}
          onChange={(e, newValue) => setExpenseGrowth(newValue as number)}
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
        />

        <Typography>
          <strong>Updated NOI:</strong>{" "}
          {updatedNOI < 0 ? (
            <span style={{ color: "red" }}>
              ${updatedNOI.toFixed(2)} (Expenses exceed revenue!)
            </span>
          ) : (
            `$${updatedNOI.toFixed(2)}`
          )}
        </Typography>

        <Typography>
          <strong>Updated Cap Rate:</strong> {updatedCapRate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SensitivityAnalysis;
