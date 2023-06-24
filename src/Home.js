import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Button } from '@mui/material';
import AppBarMenuAvatar from './AppBarMenuAvatar';
import Footer from './Footer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const drawerWidth = 240;
const cards = [1, 2, 3, 4, 5, 6];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();

function HomeContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
          >
            <Button href="/home" color ="inherit" sx={{ flexGrow: 1 }}>
            <MenuBookIcon fontSize='large' />
            <Typography
              pl={1}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              Hybrid Classroom
            </Typography>
            </Button>

            <AppBarMenuAvatar>
            </AppBarMenuAvatar>
              
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
          <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Danh sách lớp học
            </Typography>

            <Grid item xs={12}>
              <Container sx={{ py: 3 }} maxWidth="lg">
          <Grid container spacing={4}>
              <Grid item key={0} xs={12} sm={6} md={4}>


                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      IT001.MTCL
                    </Typography>
                    <Typography variant="p" color="text.secondary" align="left">
                      Nhập môn lập trình chất lượng cao năm học 2022-2023
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href="/classhome" size="small">Vào lớp</Button>
                    <Button size="small" disabled="true">Xóa lớp</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item key={0} xs={12} sm={6} md={4}>


                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      MA003.MTCL
                    </Typography>
                    <Typography variant="p" color="text.secondary" align="left">
                      Đại số tuyến tính chất lượng cao năm học 2022-2023
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href="/classhome" size="small">Vào lớp</Button>
                    <Button size="small" disabled="true">Xóa lớp</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item key={0} xs={12} sm={6} md={4}>


                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      CE212.MTCL
                    </Typography>
                    <Typography variant="p" color="text.secondary" align="left">
                      Nhập môn mạch điện chất lượng cao năm học 2022-2023
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href="/classhome" size="small">Vào lớp</Button>
                    <Button size="small" disabled="true">Xóa lớp</Button>
                  </CardActions>
                </Card>
              </Grid>

          </Grid> 
        </Container>
              </Grid>
          </Container>
        </Box>
      </Box>
      <Footer>
      </Footer>
    </ThemeProvider>
  );
}

export default function Home() {
  return <HomeContent />;
}

/* 
{cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>


                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      IT001.MTCL.1
                    </Typography>
                    <Typography variant="p" color="text.secondary" align="left">
                      Nhập môn lập trình chất lượng cao năm học 2022-2023
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href="/classhome" size="small">Vào lớp</Button>
                    <Button size="small" disabled="true">Xóa lớp</Button>
                  </CardActions>
                </Card>
              </Grid> 
            ))} 
*/
