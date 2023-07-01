import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import moment from "moment";

export default function FormDialog(props) {
  const { listExercise } = props;
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [question, setQuestion] = React.useState("");
  const [inputTimer, setTimer] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [counter, setCounter] = React.useState([]);
  const [correctAnswer, setCorrectAnswer] = React.useState("");
  const [alueAnswerA, setValueAnswerA] = React.useState("A. ");
  const [alueAnswerB, setValueAnswerB] = React.useState("B. ");
  const [alueAnswerC, setValueAnswerC] = React.useState("C. ");
  const [alueAnswerD, setValueAnswerD] = React.useState("D. ");
  const reset = () => {
    setQuestion("");
    setCorrectAnswer("");
    setValueAnswerA("A. ");
    setValueAnswerB("B. ");
    setValueAnswerC("C. ");
    setValueAnswerD("D. ");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    // await axios
    //   .post(urlAPI, {
    //     correctAnswer: correctAnswer,
    //     inputTimer: inputTimer,
    //     options: [alueAnswerA, alueAnswerB, alueAnswerC, alueAnswerD],
    //     tittle: question,
    //   })
    //   .then(() => {
    //     setOpen(false);
    //     axios
    //       .get(urlAPI)
    //       .then((response) => {
    //         localStorage.setItem("exercise", JSON.stringify(response.data));
    //         console.log({ response });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   })
    //   .catch((error) => {
    //     // console.log("Wrong ID or Password");
    //     console.log(error);
    //   })
    //   .finally(() => window.location.reload());

    const arr = [
      {
        inputTimer: inputTimer,
        deadline: moment(deadline.$d).format("DD-MM-YYYY"),
        data: result,
        progress: null,
        result: null,
      },
    ];

    if (listExercise) {
      const newArr = listExercise.concat(arr);
      localStorage.setItem("list_exercise", JSON.stringify(newArr));
    } else {
      localStorage.setItem("list_exercise", JSON.stringify(arr));
    }
    window.location.reload();
  };
  const handleNextAnswer = () => {
    const data = {
      content: question,
      options: [
        { description: alueAnswerA },
        { description: alueAnswerB },
        { description: alueAnswerC },
        { description: alueAnswerD },
      ],
      answer: correctAnswer,
    };
    setResult([...result, data]);
    reset();
  };
  const handleChangeText = (event, id) => {
    switch (id) {
      case 1:
        setQuestion(event.target.value);
        break;
      case 2:
        setValueAnswerA(event.target.value);
        break;
      case 3:
        setValueAnswerB(event.target.value);
        break;
      case 4:
        setValueAnswerC(event.target.value);
        break;
      case 5:
        setValueAnswerD(event.target.value);
        break;
      case 6:
        setCorrectAnswer(event.target.value);
        break;
      case 7:
        setTimer(event.target.value);
        break;
      default:
        break;
    }
  };

  const listDialog = [
    {
      id: 1,
      label: "Câu hỏi",
      variant: "standard",
    },
    {
      id: 2,
      label: "Đáp án A",
      variant: "filled",
      defaultValue: "A. ",
    },
    {
      id: 3,
      label: "Đáp án B",
      variant: "filled",
      defaultValue: "B. ",
    },
    {
      id: 4,
      label: "Đáp án C",
      variant: "filled",
      defaultValue: "C. ",
    },
    {
      id: 5,
      label: "Đáp án D",
      variant: "filled",
      defaultValue: "D. ",
    },
  ];

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#308fe8",
          color: "white",
          marginBottom: "10px",
        }}
      >
        Tạo bài tập mới
      </Button>
      <Dialog open={open}>
        <DialogTitle>Bài tập</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thêm câu hỏi mới cho bài tập của bạn thêm phong phú
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Hạn nộp bài"
                value={deadline}
                onChange={(newValue) => {
                  setDeadline(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Thời gian làm bài"
            placeholder="Nhập số phút"
            type="number"
            onChange={(event) => handleChangeText(event, 7)}
          />
          {listDialog.map((item) => {
            return (
              <TextField
                key={item.id}
                autoFocus
                margin="dense"
                label={item.label}
                fullWidth
                variant={item.variant}
                placeholder={item.placeholder}
                multiline
                maxRows={4}
                onChange={(event) => {
                  handleChangeText(event, item.id);
                }}
                value={
                  item.id === 1
                    ? question
                    : item.id === 2
                    ? alueAnswerA
                    : item.id === 3
                    ? alueAnswerB
                    : item.id === 4
                    ? alueAnswerC
                    : item.id === 5
                    ? alueAnswerD
                    : ""
                }
              />
            );
          })}

          <FormControl fullWidth margin="dense">
            <InputLabel>Đáp án</InputLabel>
            <Select
              value={correctAnswer}
              label="Đáp án"
              onChange={(event) => handleChangeText(event, 6)}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Huỷ</Button>
          <Button onClick={handleNextAnswer}>Lưu câu hỏi</Button>
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: "#308fe8", color: "white" }}
          >
            Tạo bài tập
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
