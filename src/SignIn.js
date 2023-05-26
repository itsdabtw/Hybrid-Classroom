import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const theme = createTheme();

export default function SignIn() {

  const A = '19520379';
  const passA = 'aaa';
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState ("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === '19520379' && password === 'aaa'){
      console.log("You're logged in");
      navigate('/home');
    } console.log('Wrong ID or Password'); 

    /* const config = {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    axios.post('https://hybrid-smart-class.onrender.com/api/v1/auth/login', {
    username: username,
    password: password
  }, config)
  .then(response => {
    setMessage("You're logged in");
    console.log("You're logged in");
    navigate('/home'); // điều hướng user sang trang home.
  })
  .catch(error => {
    console.log('Wrong ID or Password');
    setErrorMessage("Login failed");
  }); */
}; 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <MenuBookIcon color='primary' fontSize='large' />
          <Typography component="h1" variant="h5">
            HYBRID CLASSROOM 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên người dùng"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              value = {username}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value = {password}

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Nhớ mật khẩu"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ĐĂNG NHẬP
            </Button>
            <Grid container>
              <Grid item>
                <Link href="register" variant="body2">
                  {"Chưa có tài khoản? Đăng ký"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    
  );
}
