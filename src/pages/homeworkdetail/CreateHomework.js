import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [question, setQuestion] = React.useState("");
  const [value, setValue] = React.useState("");
  const [inputTimer, setTimer] = React.useState("");
  const [correctAnswer, setCorrectAnswer] = React.useState("");
  const [alueAnswerA, setValueAnswerA] = React.useState("");
  const [alueAnswerB, setValueAnswerB] = React.useState("");
  const [alueAnswerC, setValueAnswerC] = React.useState("");
  const [alueAnswerD, setValueAnswerD] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTimeRecord = (event) => {
    setTimer(event.target.value);
  };

  const handleNextAnswer = () => {
    const data = {
      title: question,
      options: [alueAnswerA, alueAnswerB, alueAnswerC, alueAnswerD],
      correctAnswer: correctAnswer,
      inputTimer: inputTimer,
    };
    setResult([...result, data]);
  };
  const handleChangeText = (event) => {
    setQuestion(event.target.value);
  };

  const getCorrectAnswer = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleChangeText1 = (event) => {
    setValueAnswerA({ description: event.target.value });
  };
  const handleChangeText2 = (event) => {
    setValueAnswerB({ description: event.target.value });
  };
  const handleChangeText3 = (event) => {
    setValueAnswerC({ description: event.target.value });
  };
  const handleChangeText4 = (event) => {
    setValueAnswerD({ description: event.target.value });
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
        sx={{ backgroundColor: "#308fe8", color: "white" }}
      >
        Tạo bài tập mới
      </Button>
      <Dialog open={open}>
        <DialogTitle>Bài tập</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thêm câu hỏi mới cho bài tập của bạn thêm phong phú
          </DialogContentText>
          <TextField
            margin="dense"
            label="Thời gian làm bài"
            placeholder="Nhập số phút"
            onChange={getTimeRecord}
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
                defaultValue={item.defaultValue}
                placeholder={item.placeholder}
                multiline
                maxRows={4}
                onChange={(event) => {
                  switch (item.id) {
                    case 1:
                      handleChangeText(event);
                      break;
                    case 2:
                      handleChangeText1(event);
                      break;
                    case 3:
                      handleChangeText2(event);
                      break;
                    case 4:
                      handleChangeText3(event);
                      break;
                    case 5:
                      handleChangeText4(event);
                      break;
                    default:
                      break;
                  }
                }}
              />
            );
          })}

          <FormControl fullWidth margin="dense">
            <InputLabel>Đáp án</InputLabel>
            <Select
              value={correctAnswer}
              label="Đáp án"
              onChange={getCorrectAnswer}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={handleNextAnswer}>Câu hỏi tiếp theo</Button>
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
