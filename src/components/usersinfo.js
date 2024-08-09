import { Avatar, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { socket } from "../utils/socketio";
export default function UserInfo({id, name, imageUrl}) {
  const dispatch=useDispatch()
  const user_id=window.localStorage.getItem("user_id")
  return (
    <>
        <Stack direction="row" justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={1}>
                <Avatar src={imageUrl}></Avatar>
                <Typography>{name}</Typography>
            </Stack>
            <Button 
              variant="contained"
              onClick={() => {
              socket.emit("friend_request", { to: id, from: user_id });
              alert("Friend Request sent!");
            }}
            >
            SEND REQUEST</Button>
        </Stack>
    </>
  )
}
