import React, { useState } from "react";
import {
  CssBaseline,
  Box,
  Container,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import QuestionCard from "./QuestionCard";
import { AppBar } from "../homework/Homework";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Countdown from "react-countdown";
import { useNavigate, useLocation } from "react-router-dom";

function HomeworkDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const [timeUp, setTimeUp] = useState(false);

  const questions = location.state.exercise.data;
  const mdTheme = createTheme();
  const minutesDefalut = 0.1;

  const onCompleteRecord = () => {
    alert("Hết thời gian làm bài");
    setTimeUp(true);
    navigate(-1);
  };

  const RenderTimmer = ({ hours, minutes, seconds, completed }) => {
    return (
      <Box>
        <Typography pl={1} component="h5" variant="h6" color="inherit" noWrap>
          {minutes} phút {seconds} giây
        </Typography>
      </Box>
    );
  };

  const Header = () => {
    return (
      <AppBar position="absolute">
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <Button href="#" color="inherit" sx={{ flexGrow: 1 }}>
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
        </Toolbar>
        <Typography pl={1} component="h5" variant="h6" color="inherit" noWrap>
          Thời gian làm bài còn
        </Typography>
        <Countdown
          date={Date.now() + minutesDefalut * 60000}
          renderer={RenderTimmer}
          onComplete={onCompleteRecord}
        />
      </AppBar>
    );
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          backgroundColor: "white",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <QuestionCard questions={questions} isTimeUp={timeUp} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default HomeworkDetail;
