// src/components/Filters.tsx
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface FiltersProps {
  financing: string;
  onFinancingChange: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ financing, onFinancingChange }) => {
  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
      <FormControl variant="outlined" size="small">
        <InputLabel>Financing</InputLabel>
        <Select
          value={financing}
          onChange={(e) => onFinancingChange(e.target.value)}
          label="Financing"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Financed">Financed</MenuItem>
          <MenuItem value="Cash">Cash Purchase</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Filters;
