import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { mainListItems } from "../../listItems";
import { Button } from "@mui/material";
import AppBarMenuAvatar from "../../AppBarMenuAvatar";
import Footer from "../../Footer";
import HomeworkTable from "../../components/HomeworkTable";
import Title from "../../Title";
import FormDialog from "../homeworkdetail/CreateHomework";
import axios from "axios";

const drawerWidth = 240;

export const AppBar = styled(MuiAppBar, {
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function HomeworkContent() {
  const [open, setOpen] = React.useState(true);
  const [exercise, setExercise] = React.useState([]);
  const [listExercise, setListExercise] = React.useState([]);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    const exercises = localStorage.getItem("exercise");
    if (exercises) {
      const arr = JSON.parse(exercises);
      setExercise(arr);
    }
  }, []);
  React.useEffect(() => {
    axios
      .get("http://54.253.92.7/api/v1/quetion/custom/ktmt001")
      .then((response) => {
        const dataAPI = response?.data?.data?.filter(
          (item, index) =>
            item.answer &&
            item.answer !== "" &&
            item.content !== "" &&
            item.content !== "cau hoi 1" &&
            index !== 5 &&
            item.content !== "cau hoi" &&
            item.content !== "Cau hoi 1" &&
            item.content !== "ABC"
        );
        dataAPI?.splice(6, 4);
        if (exercise.length === 0) {
          localStorage.setItem(
            "exercise",
            JSON.stringify([
              {
                deadline: "01-07-2023",
                inputTimer: response.data.inputTimer,
                data: dataAPI,
                progress: null,
                result: null,
              },
            ])
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [exercise]);

  React.useEffect(() => {
    const list_exercise = localStorage.getItem("list_exercise");
    if (list_exercise) {
      const arr = JSON.parse(list_exercise);
      setListExercise(arr);
    }
    localStorage.removeItem("list_exercise");
  }, []);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

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
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Typography component="h3" variant="h3 " color="inherit">
              IT001.MTCL.1
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
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

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper
              sx={{
                p: 2,
                maxWidth: "lg",
              }}
            >
              <Title>Bài tập</Title>
              <FormDialog listExercise={listExercise} />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <HomeworkTable exerciseAPI={exercise}></HomeworkTable>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>
      </Box>
      <Footer></Footer>
    </ThemeProvider>
  );
}

export default function Homework() {
  return <HomeworkContent />;
}
