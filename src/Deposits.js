import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import LogoutIcon from "@mui/icons-material/Logout";
const Deposits = ({ onChangeStatus, isOnline, isOpenMeeting, handleClick }) => {
  const role = localStorage.getItem("role");
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const status = isOnline ? "Đóng lớp" : "Mở lớp";
  const title = isOpenMeeting ? "Thoát" : "Vào lớp";
  return (
    <React.Fragment>
      <Title>Tình trạng lớp học</Title>

      <Stack
        sx={{ color: "inherit" }}
        spacing={2}
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
      >
        {isOnline ? (
          <>
            <CircularProgress color="success" size={30} />
            <Typography component="p" variant="h4">
              Online
            </Typography>
          </>
        ) : (
          <Typography component="p" variant="h4">
            Offline
          </Typography>
        )}
      </Stack>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Ngày {date}
      </Typography>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: role === "teacher" ? "space-around" : "center",
        }}
      >
        {role === "teacher" && (
          <Button variant="contained" onClick={onChangeStatus}>
            {status}
          </Button>
        )}

        <Button
          // href="https://meet.google.com/"
          variant="contained"
          endIcon={isOpenMeeting ? <LogoutIcon /> : <SendIcon />}
          onClick={handleClick}
          disabled={!isOnline}
        >
          {title}
        </Button>
      </div>
    </React.Fragment>
  );
};
export default Deposits;
