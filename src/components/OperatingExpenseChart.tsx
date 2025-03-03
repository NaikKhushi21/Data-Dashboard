// src/components/OperatingExpensesChart.tsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface OperatingExpensesChartProps {
  maintenancecosts: number;
  insurancecosts: number;
  propertytaxes: number;
  utilities: number;
  reservesforrepairs: number;
  otheroperatingexpenses: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const OperatingExpensesChart: React.FC<OperatingExpensesChartProps> = ({
  maintenancecosts,
  insurancecosts,
  propertytaxes,
  utilities,
  reservesforrepairs,
  otheroperatingexpenses,
}) => {
  const data = [
    { name: 'Maintenance', value: maintenancecosts },
    { name: 'Insurance', value: insurancecosts },
    { name: 'Taxes', value: propertytaxes },
    { name: 'Utilities', value: utilities },
    { name: 'Reserves', value: reservesforrepairs },
    { name: 'Other', value: otheroperatingexpenses },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OperatingExpensesChart;
