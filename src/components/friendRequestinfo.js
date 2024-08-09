import { Avatar, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { socket } from "../utils/socketio";
export default function FriendRequestInfo({_id, name, imageUrl,id}) {
    //id-> request id
    //id= user id of a person im mapping to
  const dispatch=useDispatch()
  return (
    <>
        <Stack direction="row" justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={1}>
                <Avatar alt={name} src={imageUrl}></Avatar>
                <Typography>{name}</Typography>
            </Stack>
            <Button 
              variant="contained"
              onClick={() => {
                socket.emit("accept_request",{request_id: id})
                alert(`Request Sent`);
            }}>ACCEPT REQUEST</Button>
        </Stack>
    </>
  )
}
