import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import ArchiveIcon from '@mui/icons-material/Archive';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export const mainListItems = (
  
  <React.Fragment>
    <ListItemButton href='/classhome'>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="Lịch học" />
    </ListItemButton>
    <ListItemButton href='/members'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Thành viên" />
    </ListItemButton>
    <ListItemButton href='/homework'>
      <ListItemIcon>
        <AutoStoriesIcon />
      </ListItemIcon>
      <ListItemText primary="Bài tập" />
    </ListItemButton>
    <ListItemButton href='/doc'>
      <ListItemIcon>
        <ArchiveIcon />
      </ListItemIcon>
      <ListItemText primary="Tài liệu" />
    </ListItemButton>
    <ListItemButton href='/home'>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Thoát lớp" />
    </ListItemButton>
  </React.Fragment>
);
