import SearchIcon from "@mui/icons-material/Search";
import { Link, ListItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function HomeworkTable() {
  const navigate = useNavigate();
  const [progressApp, setCounter] = useState(0);
  const [progressApp2, setCounter2] = useState(0);
  const [result, setResult] = useState(0);
  const [result2, setResult2] = useState(0);
  const [exercise, setExercise] = useState([]);
  const [timeRecord, setTimeRecord] = useState(1);

  const exercise1 = exercise?.filter((item, index) => index < 5);
  const exercise2 = exercise?.filter((item, index) => index >= 5 && index < 10);
  console.log({ exercise2 });
  console.log({ exercise1 });
  const rows = [
    {
      id: 1,
      name: "Bài tập 1",
      progress: progressApp,
      deadline: "01-07-2023",
      result: result,
    },
    {
      id: 2,
      name: "Bài tập 2",
      progress: progressApp2,
      deadline: "02-07-2023",
      result: result2,
    },
  ];

  useEffect(() => {
    const storedCounter = localStorage.getItem("idx_question");
    const storedCounter2 = localStorage.getItem("idx_question2");
    if (storedCounter) {
      setCounter(JSON.parse(storedCounter));
    }
    if (storedCounter2) {
      setCounter2(JSON.parse(storedCounter2));
    }
  }, []);
  useEffect(() => {
    const result = localStorage.getItem("result");
    if (result) {
      setResult(JSON.parse(result));
    }
    const result2 = localStorage.getItem("result2");
    if (result2) {
      setResult2(JSON.parse(result2));
    }
  }, []);
  useEffect(() => {
    const exercise = localStorage.getItem("exercise");
    if (exercise) {
      const arr = JSON.parse(exercise).data;
      arr.splice(5, 9);
      setExercise(arr);
      setTimeRecord(JSON.parse(exercise).inputTimer);
    }
  }, []);

  const openExercise = (id) => {
    switch (id) {
      case 1:
        navigate("/homeworkdetail", {
          state: {
            exercise: { data: exercise1, inputTimer: timeRecord },
            id,
          },
        });
        break;
      case 2:
        navigate("/homeworkdetail", {
          state: {
            exercise: { data: exercise2, inputTimer: timeRecord },
            id,
          },
        });
        break;
      default:
        break;
    }
  };
  return (
    <TableContainer component={Paper}>
      <ListItem>
        <Typography sx={{ display: "flex" }} variant="h6">
          Lớp: IT001.MTCL
        </Typography>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            marginLeft: "auto",
            justifyContent: "flex-end",
            width: 150,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            label="Tìm kiếm"
            placeholder="Tìm bài tập"
            inputProps={{ "aria-label": "Tìm bài tập" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </ListItem>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell>Tiến độ</TableCell>
            <TableCell align="center">Hạn nộp bài</TableCell>
            <TableCell align="center">Kết quả</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link
                  color="#1a90ff"
                  underline="hover"
                  onClick={() => openExercise(item.id)}
                >
                  {item.name}
                </Link>
              </TableCell>
              <TableCell>
                <BorderLinearProgress
                  variant="determinate"
                  value={item.progress * 100}
                />
              </TableCell>
              <TableCell align="center">{item.deadline}</TableCell>
              <TableCell align="center">{item.result} / 10 điểm</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
