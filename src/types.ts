// src/types.ts
export interface Proforma {
    id: number;
    propertyName: string;
    purchasePrice: number;
    closingCosts: number;
    initialImprovementCosts: number;
    monthlyRentalIncome: number;
    occupancyRate: number;
    annualRentIncreaseRate: number;
    propertyManagementFee: number;
    maintenanceCosts: number;
    insuranceCosts: number;
    propertyTaxes: number;
    utilities: number;
    reservesForRepairs: number;
    otherOperatingExpenses: string;
    loanAmount: number;
    interestRate: number;
    loanTerm: number;
    holdingPeriod: number;
    estimatedSalePrice: number;
    sellingCosts: number;
    roi: number;
    targetROI: number;
    otherAssumptions: string;
    simulationResults?: number[];
  }
  