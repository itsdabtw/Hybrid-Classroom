import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';   
import IconButton from '@mui/material/IconButton'; 
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';  
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { ListItem} from '@mui/material';

function createData(name, type, date, download) {
    return { name, type, date, download };
  }
  
  const rows = [
    createData('Bài 1: Tổng quan máy tính', 'PDF', '1-6-2023', 'https://drive.google.com/file/d/1atAtsYIZ_jrAoGxP0BAI5xFxzr9XONDH/view?usp=sharing'),
    createData('Bài 2: Thuật toán', 'PDF', '2-6-2023', 'https://drive.google.com/file/d/1I4VVmLUolU7Xa5MNajBvXVwFiCjxU9Ef/view?usp=sharing'),
    createData('Bài 3: Biến - biểu thức - kiểu dữ liệu trong C-C++', 'PDF','3-6-2023', 'https://drive.google.com/file/d/1tpCs6aPk05Loaxe_FtBMR59Z5Aj2Wilb/view?usp=sharing'),
    createData('Bài 4: Cấu trúc rẽ nhánh', 'PDF', '4-6-2023', 'https://drive.google.com/file/d/1xPs1Zy9wLrKAnzGxS99HHYB-Jr47YWZQ/view?usp=sharing'),
    createData('Bài 5: Cấu trúc lặp', 'PDF','5-6-2023', 'https://drive.google.com/file/d/1RYziG_hP2tNvgUqj_-6lyU_cl_KArssk/view?usp=sharing'),
  ];
  
  export default function DocTable() {
    return (

      <TableContainer component={Paper}>
        <ListItem >
        <Typography
          sx={{display: 'flex' }}
          variant="h6"
        >
          Lớp: IT001.MTCL
        </Typography>
       <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', marginLeft: 'auto', justifyContent: 'flex-end', width: 300 }}
    >
      
      <InputBase
        sx={{ ml: 1, flex: 1, }}
        label="Tìm kiếm"
        placeholder="Tìm tài liệu"
        inputProps={{ 'aria-label': 'Tìm tài liệu' }}     
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
        </ListItem>
       
        
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tên tài liệu</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell align='center'>Ngày đăng</TableCell>
              <TableCell align='center'>Tải tài liệu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell align='center'>{row.date}</TableCell>
             
                <TableCell align='center'><IconButton href={row.download}><DownloadIcon/></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }