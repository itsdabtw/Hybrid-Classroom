import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CreateDocs() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [fileUpload, setFileUpload] = React.useState();

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

  const handleUpLoad = (event) => {
    setFileUpload(event.target.files);
    console.log({ file: event.target.files });
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
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden onChange={handleUpLoad} />
          </Button>
          {fileUpload && fileUpload[0].name && (
            <DialogContentText sx={{ margin: "10px" }}>
              {fileUpload[0].name}
            </DialogContentText>
          )}
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
            onClick={handleClose}
            sx={{ backgroundColor: "#308fe8", color: "white" }}
          >
            Tạo bài giảng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
