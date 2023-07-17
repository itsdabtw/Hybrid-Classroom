import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Button } from "@mui/material";
import AppBarMenuAvatar from "./AppBarMenuAvatar";
import Footer from "./Footer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const io = require('socket.io-client');

const socket = io('http://54.253.92.7:4024', {
    query: {
        token: "19520379"
    }
});


//const host = "http://localhost:3000";

const drawerWidth = 240;
const cards = [1, 2, 3, 4, 5, 6];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();

function HomeContent() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userID = localStorage.getItem("id");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
// Event handlers
socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('message', (data) => {
  console.log('Received message:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

// Emit events
socket.emit('message', 'Hello from client');

  /*
  const [socketid, setsocketId] = useState();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host, {
      query: { token: socketid }
    })}); */

  const callDataApi = async () => {
    try {
      setLoading(true);
      const api_res = await Axios.request({
        baseURL: "http://54.253.92.7/",
        url: "api/v1/class/customapi/getclassbyid",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        params: {
          id: userID,
        },
      });
      setData(api_res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getStatusMeeting = async () => {
    await axios
      .get("http://54.253.92.7/api/v1/attendance/6426ffcb9111ba1a3f74a55f")
      .then((reponse) => {
        const data = reponse.data.data.isAttendance;
        localStorage.setItem("status_meeting", data.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callDataApi();
    getStatusMeeting();
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <Button href="/home" color="inherit" sx={{ flexGrow: 1 }}>
              <MenuBookIcon fontSize="large" />
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

            <AppBarMenuAvatar></AppBarMenuAvatar>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
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

            {loading ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1>Đang tải thông tin lớp học ...</h1>
              </div>
            ) : (
              <Grid item xs={12}>
                <Container sx={{ py: 3 }} maxWidth="lg">
                  <Grid container spacing={4}>
                    {data.map((classInfo) => {
                      return (
                        <Grid item key={0} xs={12} sm={6} md={4}>
                          <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                              component="img"
                              alt="green iguana"
                              height="140"
                              image={classInfo.imgClass}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {classInfo.nameClass}
                              </Typography>
                              <Typography
                                variant="p"
                                color="text.secondary"
                                align="left"
                              >
                                {classInfo.desClass}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button
                                onClick={() => {
                                  navigate("/classhome", {
                                    state: {
                                      className: classInfo.nameClass,
                                      classId: classInfo.classID,
                                    },
                                  });
                                }}
                                size="small"
                              >
                                Vào lớp
                              </Button>
                              <Button size="small" disabled="true">
                                Xóa lớp
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Container>
              </Grid>
            )}
          </Container>
        </Box>
      </Box>
      <Footer></Footer>
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
