import { useTheme } from "@emotion/react";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatElements, CustomScrollbar } from "../../components/ChatElements";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/reusable/search";
import { SelectConversation } from "../../redux/slices/app";
import { FetchPersonalConversations, SetCurrentConversation } from "../../redux/slices/chat";
import { socket } from "../../utils/socketio";
import { navitems } from "./navitems";

const Chat = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { pc_conversations} = useSelector((state) => state.chat);
  const {room_id} =useSelector((state)=> state.app)
  const user_id = window.localStorage.getItem("user_id");
  useEffect(() => {
    socket.emit("get_all_personal_conversation", { user_id }, (data) => {
      dispatch(FetchPersonalConversations({ conversations: data }));
    });
  }, [user_id]);
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: 300,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.5)",
      }}
    >
      <Stack sx={{ height: "100vh" }} p={3} spacing={2}>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Chats</Typography>
          <IconButton sx={{ width: "max-content" }}>
            <CircleDashed />
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            color: "#709CE6",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>

        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            color: "#709CE6",
          }}
        >
          <IconButton sx={{ width: "max-content" }}>
            <ArchiveBox size={24} />
          </IconButton>
          <Typography variant="text">Archived</Typography>
        </Stack>

        <Stack direction="row" spacing={3}>
          {navitems.map((ele, idx) =>
            ele.index === selected ? (
              <Stack direction="row" spacing={1} alignItems="center" key={idx}>
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "25%",
                    width: "max-content",
                  }}
                >
                  <IconButton sx={{ color: "#fff" }} key={ele.index}>
                    {ele.icon}
                  </IconButton>
                </Box>
                <Typography>{ele.title}</Typography>
              </Stack>
            ) : (
              <IconButton
                sx={{ width: "max-content" }}
                key={ele.index}
                onClick={() => {
                  setSelected(ele.index);
                }}
              >
                {ele.icon}
              </IconButton>
            )
          )}
        </Stack>

        <Divider />

        <CustomScrollbar style={{ overflowY: "scroll" }}>
          {/* <Stack>
                        <Stack direction="row" spacing={1}>
                            <PushPin size={20} />
                            <Typography variant='subtitle2' sx={{ color: "#676767" }}>Pinned</Typography>
                        </Stack>
                        {pc_conversations.filter((ele)=> ele.pinned).map((ele)=>{
                            return <ChatElements {...ele} key={ele.id}/>
                        })}
                    </Stack>

                    <Stack>
                        <Typography variant='subtitle2' sx={{ color: "#676767" }}>All Chats</Typography>
                        {pc_conversations.filter((ele)=> !ele.pinned).map((ele)=>{
                            return <ChatElements {...ele} key={ele.id}/>
                        })}
                    </Stack> */}
          <Stack spacing={2.4}>
            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
              All Chats
            </Typography>
            {pc_conversations ? (
              pc_conversations
                .filter((ele) => !ele.pinned)
                .map((ele) => {
                  return (
                    <ChatElements {...ele} key={ele.id} onClick={() => {
                      setSelected(ele.index);
                      dispatch(SelectConversation({room_id: ele.id})) 
                      dispatch(SetCurrentConversation({curr_conversation : ele.id}))
                    }} />
                  );
                })
            ) : (
              <Typography variant="body2">No conversations found</Typography>
            )}
          </Stack>
        </CustomScrollbar>
      </Stack>
    </Box>
  );
};

export default Chat;
