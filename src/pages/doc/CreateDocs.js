import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

export default function CreateDocs() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTitle = (event) => {
    setTitle(event.target.value);
  };

  const getCorrectAnswer = (event) => {
    setType(event.target.value);
  };
  const url = "http://54.253.92.7/api/v1/docs";

  const handleUpLoad = async () => {
    await axios
      .post(url, {
        nameDoc: title,
        url: link,
        type: type,
        author: "6481fbd9f553e627524b6701",
      })
      .then((reponse) => {
        console.log(reponse);
        window.location.reload();
      })
      .catch((err) => {
        alert("Mỗi user chỉ được tạo 1 bài giảng mới");
        setOpen(false);
        console.log(err);
      });
  };

  const getLink = (event) => {
    setLink(event.target.value);
  };
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
        Tạo bài giảng mới
      </Button>
      <Dialog open={open}>
        <DialogTitle>Bài giảng</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Tên bài giảng" onChange={getTitle} />
          <h4>Thêm bài giảng mới cho kho dữ liệu của bạn thêm phong phú</h4>

          <TextField
            sx={{
              marginBottom: "20px",
            }}
            label="Link bài giảng"
            fullWidth
            multiline
            maxRows={4}
            onChange={getLink}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Loại</InputLabel>
            <Select value={type} label="Loại" onChange={getCorrectAnswer}>
              <MenuItem value={"PDF"}>PDF</MenuItem>
              <MenuItem value={"DOC"}>DOC</MenuItem>
              <MenuItem value={"XLSM"}>XLSM</MenuItem>
              <MenuItem value={"PPT"}>PPT</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button
            onClick={handleUpLoad}
            sx={{ backgroundColor: "#308fe8", color: "white" }}
          >
            Tạo bài giảng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
