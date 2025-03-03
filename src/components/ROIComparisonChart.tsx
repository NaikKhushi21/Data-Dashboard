// src/components/ROIComparisonChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ROIComparisonChartProps {
  data: any[];
}

const ROIComparisonChart: React.FC<ROIComparisonChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    property: item.propertyname,
    roi: item.roi || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="property" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="roi" fill="#82ca9d" name="ROI (%)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ROIComparisonChart;
