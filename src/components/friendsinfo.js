import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Chat } from "phosphor-react";
import React from "react";
import { socket } from "../utils/socketio";
export default function Friendsinfo({ id, name, imageUrl }) {
  //id-> friends id
  //clients id
  const user_id = window.localStorage.getItem("user_id");
  return (
    <>
      <Stack direction="row" justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={2}>
          <Avatar src={imageUrl}></Avatar>
          <Typography>{name}</Typography>
        </Stack>
        <Button
          variant="outlined"
          onClick={() => {
            socket.emit("start_conversation", { to: id, from: user_id });
            window.location.reload();
          }}
        >
          <Chat size={20} />
        </Button>
      </Stack>
    </>
  );
}
