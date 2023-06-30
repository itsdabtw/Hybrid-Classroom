import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar } from "../homework/Homework";
import QuestionCard from "./QuestionCard";

function HomeworkDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, inputTimer } = location.state.exercise;
  const [timeUp, setTimeUp] = useState(false);

  const questions = data;
  const mdTheme = createTheme();
  const minutesDefalut = inputTimer;

  useEffect(() => {
    const handleBack = () => {
      localStorage.removeItem(
        location.state.id === 1 ? "idx_question" : "idx_question2"
      );
      localStorage.removeItem(location.state.id === 1 ? "result" : "result2");
      console.log("remove");
    };

    window.addEventListener("popstate", handleBack);
  }, []);

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
          <QuestionCard
            questions={questions}
            isTimeUp={timeUp}
            id={location.state.id}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default HomeworkDetail;
