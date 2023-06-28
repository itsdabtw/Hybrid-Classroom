import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Link, ListItem } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

function createData(name, progress, deadline, download, upload) {
  return { name, progress, deadline, download, upload };
}

const rows = [
  createData(
    "Bài tập 1",
    "100",
    "24-6-2023",
    "https://drive.google.com/file/d/1atAtsYIZ_jrAoGxP0BAI5xFxzr9XONDH/view?usp=sharing",
    "ect"
  ),
  createData(
    "Bài tập 2",
    "50",
    "28-6-2023",
    "https://drive.google.com/file/d/1atAtsYIZ_jrAoGxP0BAI5xFxzr9XONDH/view?usp=sharing",
    "ect"
  ),
  createData(
    "Bài tập 3",
    "0",
    "1-7-2023",
    "https://drive.google.com/file/d/1atAtsYIZ_jrAoGxP0BAI5xFxzr9XONDH/view?usp=sharing",
    "ect"
  ),
];

export default function HomeworkTable() {
  const navigate = useNavigate();
  const urlAPI = "http://54.253.92.7/api/v1/quetion/custom/ktmt001";
  const [progressApp, setCounter] = useState(0);

  useEffect(() => {
    const storedCounter = localStorage.getItem("idx_question");
    if (storedCounter) {
      setCounter(JSON.parse(storedCounter));
    }
  }, []);
  const openExercise = async () => {
    await axios
      .get(urlAPI)
      .then((response) => {
        navigate("/homeworkdetail", {
          state: { exercise: response.data },
        });
      })
      .catch((err) => {
        console.log(err);
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
            <TableCell align="center">Tải tài liệu</TableCell>
            <TableCell align="center">Nộp bài</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link
                  color="#1a90ff"
                  underline="hover"
                  onClick={() => openExercise()}
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>
                <BorderLinearProgress
                  variant="determinate"
                  value={progressApp * 100}
                />
              </TableCell>
              <TableCell align="center">{row.deadline}</TableCell>

              <TableCell align="center">
                <IconButton href={row.download}>
                  <DownloadIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <IconButton href={row.upload}>
                  <FileUploadIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
