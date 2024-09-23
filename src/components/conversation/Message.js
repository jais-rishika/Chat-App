import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchCurrentConversation,
  SetCurrentConversation,
} from "../../redux/slices/chat";
import { socket } from "../../utils/socketio";
import { CustomScrollbar } from "../ChatElements";
import DocMsg from "./Messages/DocMsg";
import ImgMsg from "./Messages/ImgMsg";
import LinkMsg from "./Messages/LinkMsg";
import ReplyMsg from "./Messages/ReplyMsg";
import TextMsg from "./Messages/TextMsg";
import Timeline from "./Messages/Timeline";
const Message = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pc_conversations, pc_current_messages } = useSelector(
    (state) => state.chat
  );
  const { room_id } = useSelector((state) => state.app);
  useEffect(() => {
    const current_conversation = pc_conversations.find(
      (ele) => ele.id === room_id.room_id
    );
    console.log("curr"+current_conversation)
    socket.emit(
      "get messages",
      { conversation_id: current_conversation.id },
      (data) => {
        dispatch(FetchCurrentConversation({ messages: data }));
      }
    );
    dispatch(SetCurrentConversation(current_conversation));
  }, [pc_conversations,pc_current_messages,room_id]);
  
  return (
    <CustomScrollbar style={{ overflowY: "scroll", overflowX: "hidden" }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.neutral,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.1)",
        }}
        p={1}
      >
        <Stack direction="column">
          {console.log(pc_current_messages)}
          {pc_current_messages?(pc_current_messages.map((msg, idx) => {
            //maybe 
            switch (msg.type) {
              case "divider":
                return <Timeline ele={msg} key={idx} />;
              case "msg":
                switch (msg.subtype) {
                  case "doc":
                    return <DocMsg ele={msg} key={idx} />;
                  case "link":
                    return <LinkMsg ele={msg} key={idx} />;
                  case "img":
                    return <ImgMsg ele={msg} key={idx} />;
                  case "reply":
                    return <ReplyMsg ele={msg} key={idx} />;
                  default:
                    return <TextMsg ele={msg} key={idx} />;
                }
              default:
                return <></>;
            }
          })):(
            <Stack justifyContent="center" alignItems="center">
                 <Typography>Start Chatting</Typography>
            </Stack>
          )}
        </Stack>
      </Box>
    </CustomScrollbar>
  );
};

export default Message;
