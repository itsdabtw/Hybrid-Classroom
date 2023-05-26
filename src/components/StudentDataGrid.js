import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Title from '../Title';

const columns = [
  { field: 'id', headerName: 'Stt', width: 120 },
  {
    field: 'fullName',
    headerName: 'Họ và tên',
    description: 'Họ và tên của học viên: ',
    sortable: false,
    width: 270,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'StudentID',
    headerName: 'MSSV',
    description: 'Mã số sinh viên của học viên: ',
    sortable: true,
    width: 170,
  },
  {
    field: 'age',
    headerName: 'Tuổi',
    type: 'number',
    width: 170,
    editable: false,
  },
  { field: 'class', headerName: 'Lớp', width: 170 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, StudentID: '19520320', class: 'IT001.MTCL' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 18 },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Ben', firstName: 'Harvey', age: 32 },
  { id: 11, lastName: 'Ben', firstName: 'Lub', age: 62 },
  { id: 12, lastName: 'Michiel', firstName: 'Harvey', age: 15 },
  { id: 13, lastName: 'Davie', firstName: 'Harvey', age: 15 },
  { id: 14, lastName: 'Dads', firstName: 'Haas', age: 15 },
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 750, width: '100%' }}>
      <Title>
        Danh sách học viên
      </Title>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 12,
            },
          },
        }}
        pageSizeOptions={[12]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}