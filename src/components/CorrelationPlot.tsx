// src/components/CorrelationPlot.tsx
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CorrelationPlotProps {
  data: any[];  
  xKey: string; 
  yKey: string;
  xLabel: string;
  yLabel: string;
}

const CorrelationPlot: React.FC<CorrelationPlotProps> = ({ data, xKey, yKey, xLabel, yLabel }) => {
  const scatterData = data.map((item) => ({
    x: item[xKey] || 0,
    y: item[yKey] || 0,
    name: item.propertyname,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name={xLabel} />
        <YAxis type="number" dataKey="y" name={yLabel} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Properties" data={scatterData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CorrelationPlot;
