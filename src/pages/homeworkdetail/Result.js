import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Result(props) {
  const {
    answers,
    restartQuiz,
    questions,
    isComplete,
    progress,
    id,
    listExercise,
  } = props;
  const navigate = useNavigate();
  const correctAnswers = useMemo(() => {
    return questions.filter((q, i) => {
      return q.answer === parseInt(answers[i]);
    }).length;
  }, [answers]);
  const [exercise, setExercise] = React.useState([]);

  useEffect(() => {
    const exercises = localStorage.getItem("exercise");
    if (exercises) {
      const arr = JSON.parse(exercises);
      setExercise(arr);
    }
  }, []);
  // console.log({ exercise });
  // console.log({ id });
  const handelBack = () => {
    if (isComplete) {
      const results = (10 / questions.length) * correctAnswers;
      const data = listExercise.map((item, index) => {
        if (index === id) {
          return { ...item, result: results.toFixed(0), progress: progress };
        }
        return item;
      });
      const dataAPI = exercise.map((item) => {
        return { ...item, result: results.toFixed(0), progress: progress };
      });

      localStorage.setItem(
        id === -1 ? "exercise" : "list_exercise",
        JSON.stringify(id === -1 ? dataAPI : data)
      );
      navigate("/homework");
    }
  };

  return (
    <Card variant="outlined" sx={{ pt: 3, pb: 3 }}>
      <CardContent>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mb: 3 }}
          variant="h4"
          color="text.secondary"
        >
          Result
        </Typography>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mb: 3 }}
          variant="h4"
          color="text.secondary"
        >
          {correctAnswers} / {questions.length}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={restartQuiz} variant="outlined">
          Retry
        </Button>
        <Button onClick={handelBack} variant="contained">
          Hoàn thành
        </Button>
      </CardActions>
    </Card>
  );
}
