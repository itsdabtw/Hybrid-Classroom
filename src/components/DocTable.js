import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ListItem } from "@mui/material";
import moment from "moment";
import axios from "axios";

export default function DocTable(props) {
  const { listDocs } = props;
  const formartTime = (time) => {
    return moment(time).format("DD/MM/YYYY");
  };
  const url = "http://54.253.92.7/api/v1/docs";

  const handleRemove = async (id) => {
    await axios
      .delete(`${url}/${id}`)
      .then((reponse) => {
        console.log(reponse);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <TableContainer component={Paper}>
      <ListItem>
        <Typography sx={{ display: "flex" }} variant="h6">
          Lớp: KTMT0001
        </Typography>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            marginLeft: "auto",
            justifyContent: "flex-end",
            width: 300,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            label="Tìm kiếm"
            placeholder="Tìm tài liệu"
            inputProps={{ "aria-label": "Tìm tài liệu" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </ListItem>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên tài liệu</TableCell>
            <TableCell>Loại</TableCell>
            <TableCell align="center">Ngày đăng</TableCell>
            <TableCell align="center">Tải tài liệu</TableCell>
            <TableCell align="center">Xoá tài liệu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listDocs.map((row, index) => {
            return (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nameDoc}
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell align="center">
                  {formartTime(row.createdAt)}
                </TableCell>

                <TableCell align="center">
                  <IconButton href={row.url}>
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleRemove(row._id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
