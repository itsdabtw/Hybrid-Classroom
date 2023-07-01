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
import DocTable from "../../components/DocTable";
import Title from "../../Title";
import axios from "axios";
import CreateDocs from "./CreateDocs";

const drawerWidth = 240;

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

function DocContent() {
  const [open, setOpen] = React.useState(true);
  const [listDocs, setListDocs] = React.useState([]);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const getListDocs = () => {
    axios
      .get("http://54.253.92.7/api/v1/docs")
      .then((reponse) => {
        setListDocs(reponse.data.data);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getListDocs();
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
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: 6, display: "flex", flexDirection: "column" }}>
                <Title>Tài liệu học tập</Title>
                <CreateDocs />
                <DocTable listDocs={listDocs} />
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer></Footer>
    </ThemeProvider>
  );
}

export default function Doc() {
  return <DocContent />;
}
