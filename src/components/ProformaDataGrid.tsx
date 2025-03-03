// src/components/ProformaDataGrid.tsx
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

interface ProformaDataGridProps {
  data: any[];
  onRowSelected: (selected: any | null) => void;
}

const ProformaDataGrid: React.FC<ProformaDataGridProps> = ({ data, onRowSelected }) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 180 },
    { field: 'propertyname', headerName: 'Property Name', width: 180 },
    { field: 'purchaseprice', headerName: 'Purchase Price', width: 150, type: 'number' },
    { field: 'closingcosts', headerName: 'Closing Costs', width: 150, type: 'number' },
    { field: 'monthlyrentalincome', headerName: 'Monthly Rent', width: 150, type: 'number' },
    { field: 'roi', headerName: 'ROI (%)', width: 100, type: 'number' },
  ];

  const handleRowClick = (params: any) => {
    const selectedRow = data.find((row) => row.id === params.id) || null;
    onRowSelected(selectedRow);
  };

  return (
    <div style={{ height: 370, width: '80%', alignContent: 'center', margin: '0 auto' }}>
      <DataGrid
        rows={data}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        getRowId={(row) => row.id}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default ProformaDataGrid;
