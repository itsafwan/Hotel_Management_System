import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';

export default function ChartUserByCountry() {
  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', p: 2, flexGrow: 1 }}>
      <Typography component="h2" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
        Guest Nationality
      </Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 65, label: 'Local', color: '#0288d1' },
              { id: 1, value: 35, label: 'Foreign', color: '#01579b' },
            ],
            innerRadius: 30,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        height={150}
        slots={{
          legend: () => null,
        }}
      />
    </Card>
  );
}
