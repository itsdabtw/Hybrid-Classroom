import React, { useMemo } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Result(props) {
  const { answers, restartQuiz, questions, isComplete, progress, id } = props;
  const navigate = useNavigate();

  const correctAnswers = useMemo(() => {
    return questions.filter((q, i) => {
      return q.answer === parseInt(answers[i]);
    }).length;
  }, [answers]);

  const handelBack = () => {
    if (isComplete) {
      const results = (10 / questions.length) * correctAnswers;
      localStorage.setItem(
        id === 1 ? "result" : "result2",
        JSON.stringify(results.toFixed(0))
      );
      localStorage.setItem(
        id === 1 ? "idx_question" : "idx_question2",
        JSON.stringify(progress)
      );

      setTimeout(() => {
        navigate("/homework");
      }, 500);
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
