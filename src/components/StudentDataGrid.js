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
  { id: 1, lastName: 'Việt Khang', firstName: 'Nguyễn', age: 21, StudentID: '19520320', class: 'IT001.MTCL' },
  { id: 2, lastName: 'Minh Hoàng', firstName: 'Nguyễn', age: 21, StudentID: '19520321', class: 'IT001.MTCL' },
  { id: 3, lastName: 'Thiên Trúc', firstName: 'Đinh', age: 19, StudentID: '19520322', class: 'IT001.MTCL' },
  { id: 4, lastName: 'Thịnh', firstName: 'Đinh', age: 18, StudentID: '19520323', class: 'IT001.MTCL' },
  { id: 5, lastName: 'Minh Quân', firstName: 'Lê', age: 18, StudentID: '19520324', class: 'IT001.MTCL' },
  { id: 6, lastName: 'Tường Lân', firstName: 'Đặng', age: 23, StudentID: '19520326', class: 'IT001.MTCL' },
  { id: 7, lastName: 'Đức Anh', firstName: 'Huỳnh', age: 24, StudentID: '19520327', class: 'IT001.MTCL' },
  { id: 8, lastName: 'Nhật Linh', firstName: 'Phan Lê', age: 20, StudentID: '19521111', class: 'IT001.MTCL' },
  { id: 9, lastName: 'Thế Sơn', firstName: 'Phan', age: 20, StudentID: '19521234', class: 'IT001.MTCL' },
  { id: 10, lastName: 'Trung Thành', firstName: 'Lê', age: 18, StudentID: '19520135', class: 'IT001.MTCL' },
  { id: 11, lastName: 'Xuân Tài', firstName: 'Nguyễn', age: 19, StudentID: '1952123', class: 'IT001.MTCL' },
  { id: 12, lastName: 'Xuân Tài', firstName: 'Đinh Ngô', age: 22, StudentID: '18520320', class: 'IT001.MTCL' },
  { id: 13, lastName: 'Khôi Vĩ', firstName: 'Vũ', age: 22, StudentID: '20520320', class: 'IT001.MTCL' },
  { id: 14, lastName: 'Quang Huy', firstName: 'Đàm', age: 19, StudentID: '19520230', class: 'IT001.MTCL' },
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