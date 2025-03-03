// src/components/CashFlowChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CashFlowChartProps {
  cashFlowData: { period: number; netCashFlow: number }[];
}

const CashFlowChart: React.FC<CashFlowChartProps> = ({ cashFlowData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={cashFlowData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" label={{ value: "Period", position: "insideBottom", offset: -5 }} />
        <YAxis label={{ value: "Net Cash Flow", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="netCashFlow" stroke="blue" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CashFlowChart;
