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

export default function HomeworkTable(props) {
  const { exerciseAPI } = props;
  const navigate = useNavigate();
  const [listExercise, setListExercise] = useState();
  const [data, setData] = useState(exerciseAPI);

  useEffect(() => {
    const list_exercise = localStorage.getItem("list_exercise");
    if (list_exercise) {
      setListExercise(JSON.parse(list_exercise));
    } else {
      setListExercise(exerciseAPI);
    }

    if (listExercise) {
      setData(exerciseAPI.concat(listExercise));
    } else {
      setData(exerciseAPI);
    }
  }, [exerciseAPI]);

  const openExercise = (item, id) => {
    navigate("/homeworkdetail", {
      state: {
        exercise: { data: item.data, inputTimer: item.inputTimer },
        id: id,
        listExercise,
        exerciseAPI,
      },
    });
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
          {data?.map((item, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link
                  color="#1a90ff"
                  underline="hover"
                  onClick={() => openExercise(item, index)}
                >
                  {`Bài tập ${index + 1}`}
                </Link>
              </TableCell>
              <TableCell>
                <BorderLinearProgress
                  variant="determinate"
                  value={item.progress ? item.progress * 100 : 0}
                />
              </TableCell>
              <TableCell align="center">{item.deadline}</TableCell>
              <TableCell align="center">
                {!item.result ? "0 điểm" : `${item.result} / 10 điểm`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
