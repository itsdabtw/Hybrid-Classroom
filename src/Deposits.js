import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Title from './Title';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return (
    <React.Fragment>
      <Title>Tình trạng lớp học</Title>

      <Stack sx={{ color: 'inherit'}} spacing={2} direction="row" alignItems={'center'} justifyContent={'center'}>
      <CircularProgress color="success" size={30}/>
      <Typography component="p" variant="h4">
        Online
      </Typography>
      </Stack>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Ngày {date}
      </Typography>
      <div>
      <Button href='https://meet.google.com/' variant="contained" endIcon={<SendIcon />}>
        Vào lớp
      </Button>
      </div>
    </React.Fragment>
  );
}
