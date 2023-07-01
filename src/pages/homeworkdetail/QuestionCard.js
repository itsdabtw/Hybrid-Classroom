import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Result from "./Result";

export default function QuestionCard(props) {
  const { questions, isTimeUp, id } = props;
  const [value, setValue] = React.useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const finishedQuiz = currentQuestionIndex === questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = currentQuestionIndex / questions.length;
  if (isTimeUp) {
    localStorage.setItem("idx_question", JSON.stringify(progress));
  }
  const handleChangeRadio = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    submitAnswer(value);
    setValue(null);
  };

  const goToNext = () => {
    setCurrentQuestionIndex((prevState) => prevState + 1);
  };

  const submitAnswer = (value) => {
    setAnswers((prevState) => [...prevState, value]);
    goToNext();
  };

  const restartQuiz = () => {
    window.location.reload();
  };
  // if (finishedQuiz) {
  //   props.isComplete(true);
  // }

  if (finishedQuiz) {
    return (
      <Result
        restartQuiz={restartQuiz}
        answers={answers}
        questions={questions}
        isComplete={true}
        progress={progress}
        id={id}
      />
    );
  }
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ backgroundColor: "rgba(0,128,128,0.1)" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Câu số {currentQuestionIndex + 1}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {currentQuestion?.content}
          </Typography>

          <FormControl>
            <RadioGroup
              name="radio-group-quiz"
              value={value}
              onChange={handleChangeRadio}
            >
              {currentQuestion?.options.map((o, i) => {
                return (
                  <FormControlLabel
                    key={i + 1}
                    value={i + 1}
                    control={<Radio />}
                    label={o?.description}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button
            disabled={!value}
            onClick={handleSubmit}
            fullWidth
            size="small"
            sx={{
              backgroundColor: value ? "#008080" : "#DCDCDC",
              color: "white",
            }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
