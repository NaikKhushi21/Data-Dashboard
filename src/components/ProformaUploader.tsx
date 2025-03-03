// src/components/ProformaUploader.tsx
import React from 'react';
import { Button } from '@mui/material';
import Papa from 'papaparse';

interface ProformaUploaderProps {
  onDataParsed: (data: any[]) => void;
}


function normalizeHeader(str: string) {
  let cleaned = str.replace(/[^\w\s]/g, '');
  cleaned = cleaned.replace(/\s+/g, '');
  return cleaned.toLowerCase();
}

const ProformaUploader: React.FC<ProformaUploaderProps> = ({ onDataParsed }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data as any[];
        if (!rawData || !Array.isArray(rawData)) return;

        const originalHeaders = Object.keys(rawData[0]);
        const headerMap: Record<string, string> = {};

        originalHeaders.forEach((header) => {
          const norm = normalizeHeader(header.trim());
          headerMap[header] = norm;
        });

        const normalizedData = rawData.map((row, index) => {
          const normalizedRow: any = {};

          for (const origKey in row) {
            const normKey = headerMap[origKey];
            let val = String(row[origKey] || '').replace(/^"|"$/g, '').trim();

            if (val !== '' && !isNaN(Number(val))) {
              normalizedRow[normKey] = Number(val);
            } else {
              normalizedRow[normKey] = val;
            }
          }

          if (normalizedRow.simulationresults && typeof normalizedRow.simulationresults === 'string') {
            try {
              let cleanString = normalizedRow.simulationresults.replace(/^"|"$/g, '').replace(/'/g, '"');
              normalizedRow.simulationresults = JSON.parse(cleanString).map(Number);
            } catch {
              normalizedRow.simulationresults = [];
            }
          } else {
            normalizedRow.simulationresults = normalizedRow.simulationresults || [];
          }

          normalizedRow.id = normalizedRow.propertyname
            ? normalizedRow.propertyname.replace(/\s/g, '-')
            : `row-${index}`;

          return normalizedRow;
        });

        console.log("Parsed CSV Data:", normalizedData);
        onDataParsed(normalizedData);
      },
      error: (error) => {
        console.error("Error parsing CSV with PapaParse:", error);
      },
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        id="file-input"
        hidden
      />
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" component="span">
          Browse File
        </Button>
      </label>
    </div>
  );
};

export default ProformaUploader;
