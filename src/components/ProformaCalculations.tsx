import React from "react";
import { Proforma } from "../types";

interface ProformaCalculationsProps {
  proforma: Proforma;
}

const ProformaCalculations: React.FC<ProformaCalculationsProps> = ({ proforma }) => {
  if (!proforma) {
    return <div>No data available</div>;
  }

  // Net Operating Income (NOI) Calculation
  const NOI = proforma.monthlyRentalIncome * 12 - 
              (Number(proforma.maintenanceCosts) + Number(proforma.insuranceCosts) + Number(proforma.propertyTaxes) +
              Number(proforma.utilities) + Number(proforma.reservesForRepairs) + Number(proforma.otherOperatingExpenses));
  
  // Capitalization Rate (Cap Rate) Calculation
  const capRate = ((NOI / proforma.purchasePrice) * 100).toFixed(2);

  // Placeholder IRR Calculation (Normally requires complex financial functions)
  const estimatedIRR = ((NOI / proforma.purchasePrice) * 100).toFixed(2);

  return (
    <div>
      <h3>Proforma Calculations</h3>
      <p><strong>Net Operating Income (NOI):</strong> ${NOI.toLocaleString()}</p>
      <p><strong>Cap Rate:</strong> {capRate}%</p>
      <p><strong>Estimated IRR:</strong> {estimatedIRR}%</p>
    </div>
  );
};

export default ProformaCalculations;
