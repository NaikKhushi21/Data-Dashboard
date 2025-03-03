// src/App.tsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import ProformaUploader from './components/ProformaUploader';
import ProformaDataGrid from './components/ProformaDataGrid';
import ROIComparisonChart from './components/ROIComparisonChart';
import SimulationChart from './components/SimulationChart';
import OperatingExpensesChart from './components/OperatingExpenseChart';
import RevenueExpensesChart from './components/RevenueExpenseChart';
import CashFlowChart from './components/CashFlowChart';
import CorrelationPlot from './components/CorrelationPlot';

// import ProformaCalculations from "./components/ProformaCalculations";
import SensitivityAnalysis from "./components/SensitivityAnalysis";
import MonteCarloSimulation from "./components/MonteCarloSimulation";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  const [proformas, setProformas] = useState<any[]>([]);
  const [selectedProforma, setSelectedProforma] = useState<any | null>(null);

  const handleDataParsed = (data: any[]) => {
    setProformas(data);
    if (data.length > 0) {
      setSelectedProforma(data[0]);
    }
  };

  const handleRowSelected = (selected: any | null) => {
    setSelectedProforma(selected);
  };

  const getOperatingExpenses = (p: any) => {
    return (
      (p.maintenancecosts || 0) +
      (p.insurancecosts || 0) +
      (p.propertytaxes || 0) +
      (p.utilities || 0) +
      (p.reservesforrepairs || 0) +
      (p.otheroperatingexpenses || 0)
    );
  };

  
  const generateCashFlowData = (property: any) => {
   
    const results = [];
    for (let year = 1; year <= 5; year++) {
      const netCashFlow = (property.monthlyrentalincome || 5000) * 12 - getOperatingExpenses(property);
      results.push({ period: year, netCashFlow: netCashFlow + year * 100 });
    }
    return results;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box textAlign="center" my={4}>
          <Typography variant="h3" gutterBottom>
            Real Estate Proforma Dashboard
          </Typography>
          <Typography variant="subtitle1">
            Upload your CSV to view comparisons &amp; detailed metrics.
          </Typography>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {/* CSV Uploader & Table */}
        <Box mb={4}>
          <ProformaUploader onDataParsed={handleDataParsed} />
          <Box mt={4}>
            <Typography variant="h6" align="center">
              Uploaded Proforma Data
            </Typography>
            {proformas.length > 0 ? (
              <ProformaDataGrid data={proformas} onRowSelected={handleRowSelected} />
            ) : (
              <Typography variant="body1" align="center">
                Please upload a CSV file with proforma data.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Detailed Analysis for Selected Property */}
        {selectedProforma && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" gutterBottom>
              Detailed Analysis for {selectedProforma.propertyname || 'N/A'}
            </Typography>
            <Grid container spacing={4}>
              {/* ROI Simulation Chart */}
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardHeader title="ROI Simulation Chart" sx={{ backgroundColor: theme.palette.primary.main, color: '#fff' }} />
                  <CardContent>
                    {Array.isArray(selectedProforma.simulationresults) && selectedProforma.simulationresults.length > 0 ? (
                      <SimulationChart simulationResults={selectedProforma.simulationresults} />
                    ) : (
                      <Typography align="center" color="textSecondary">
                        No simulation data available.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Operating Expenses */}
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardHeader title="Operating Expenses Breakdown" sx={{ backgroundColor: theme.palette.secondary.main, color: '#fff' }} />
                  <CardContent>
                    <OperatingExpensesChart
                      maintenancecosts={selectedProforma.maintenancecosts || 0}
                      insurancecosts={selectedProforma.insurancecosts || 0}
                      propertytaxes={selectedProforma.propertytaxes || 0}
                      utilities={selectedProforma.utilities || 0}
                      reservesforrepairs={selectedProforma.reservesforrepairs || 0}
                      otheroperatingexpenses={selectedProforma.otheroperatingexpenses || 0}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Revenue vs. Expenses */}
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardHeader title="Revenue vs. Operating Expenses" sx={{ backgroundColor: '#009688', color: '#fff' }} />
                  <CardContent>
                    <RevenueExpensesChart
                      monthlyRentalIncome={selectedProforma.monthlyrentalincome || 0}
                      operatingExpenses={getOperatingExpenses(selectedProforma)}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Cash Flow Projection */}
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardHeader title="Cash Flow Projection" sx={{ backgroundColor: '#673ab7', color: '#fff' }} />
                  <CardContent>
                    <CashFlowChart cashFlowData={generateCashFlowData(selectedProforma)} />
                  </CardContent>
                </Card>
              </Grid>

              {/* Monte Carlo Simulation */}
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardHeader title="Monte Carlo Simulation" sx={{ backgroundColor: '#ff5722', color: '#fff' }}/>
                  <CardContent>
                  <MonteCarloSimulation proforma={selectedProforma} />
                  </CardContent>
                </Card>
              </Grid>

              {/* Sensitivity Analysis */}
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardHeader title="Sensitivity Analysis" sx={{ backgroundColor: '#dabb07', color: '#fff' }} />
                  <CardContent>
                    <SensitivityAnalysis proforma={selectedProforma} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
        <Divider sx={{ mb: 4 }} />

        {/* ROI Comparison for All Properties */}
        {proformas.length > 1 && (
          <Box mb={4}>
            <Typography variant="h5" gutterBottom>
              ROI Comparison (All Properties)
            </Typography>
            <Card sx={{ boxShadow: 3, mb: 2 }}>
              <CardContent>
                <ROIComparisonChart data={proformas} />
              </CardContent>
            </Card>

            {/* Correlation Plot (Purchase Price vs ROI) */}
            <Typography variant="h5" gutterBottom>
              Correlation: Purchase Price vs. ROI
            </Typography>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <CorrelationPlot
                  data={proformas}
                  xKey="purchaseprice"
                  yKey="roi"
                  xLabel="Purchase Price"
                  yLabel="ROI (%)"
                />
              </CardContent>
            </Card>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
