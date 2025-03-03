import React from 'react';
import { Proforma } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface ProformaComparisonProps {
  data: Proforma[];
}

const ProformaComparison: React.FC<ProformaComparisonProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="comparison table">
        <TableHead>
          <TableRow>
            <TableCell>Property Name</TableCell>
            <TableCell align="right">Purchase Price</TableCell>
            <TableCell align="right">Closing Costs</TableCell>
            <TableCell align="right">Initial Improvement</TableCell>
            <TableCell align="right">Monthly Rent</TableCell>
            <TableCell align="right">Cap Rate</TableCell>
            <TableCell align="right">ROI</TableCell>
            <TableCell>Financing</TableCell>
            <TableCell>Zoning/Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.propertyName}</TableCell>
              <TableCell align="right">${row.purchasePrice.toLocaleString()}</TableCell>
              <TableCell align="right">${row.closingCosts.toLocaleString()}</TableCell>
              <TableCell align="right">${row.initialImprovementCosts.toLocaleString()}</TableCell>
              <TableCell align="right">${row.monthlyRentalIncome.toLocaleString()}</TableCell>
              <TableCell align="right">--</TableCell>
              <TableCell align="right">{row.roi}%</TableCell>
              <TableCell>{row.loanAmount > 0 ? "Financed" : "Cash"}</TableCell>
              <TableCell>{row.otherAssumptions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProformaComparison;
