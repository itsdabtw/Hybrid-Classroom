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
import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from './context/AuthProvider';
import axios from './api/axios';

const LOGIN_URL = '/auth';


const theme = createTheme();

export default function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  
  const[user,setUser] = useState ('');
  const[pwd, setPwd] = useState ('');
  const[errMsg, setErrMsg] = useState ('');
  const[success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    navigate("/home")
    event.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({username: user,password: pwd}),
        {
          headers: {'Content-Type': 'application/json' },
          withCredentials: true
        }
        );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({user, pwd, roles, accessToken});
      setUser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
    } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
    } else {
        setErrMsg('Login Failed');
      }
      
    }
    const data = new FormData(event.currentTarget);
      console.log({
        email: user,
        password: pwd,
      });
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
              id="email"
              label="Địa chỉ Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUser(e.target.value)}
              value = {user}

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
              onChange={(e) => setPwd(e.target.value)}
              value = {pwd}

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
