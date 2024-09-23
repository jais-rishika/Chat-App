import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { OpenSnackBar, SelectConversation } from "../../redux/slices/app.js";
import {
  AddPersonalConversations,
  AddPersonalMessage,
  SetCurrentConversation,
  UpdatePersonalConversation,
} from "../../redux/slices/chat.js";
import { connectSocket, socket } from "../../utils/socketio.js";
import Sidebar from "./dashboard";
const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { pc_conversations, pc_current_conversation } = useSelector(
    (state) => state.chat
  );
  const user_id = window.localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = () => {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };
      // window.location.reload()
      if (!socket) {
        connectSocket(user_id);
      }
      const handleNewFriendRequest = (data) => {
        dispatch(OpenSnackBar({ severity: "success", message: data.message }));
      };
      const handleRequestSent = (data) => {
        dispatch(OpenSnackBar({ severity: "success", message: data.message }));
      };
      const handleRequestAccepted = (data) => {
        dispatch(OpenSnackBar({ severity: "success", message: data.message }));
      };
    
      const handleChat = (data) => {
        const existing_conversation = pc_conversations.find(
          (ele) => ele?.id === data.id
        );
        console.log(existing_conversation)
        if (existing_conversation) {
          dispatch(SetCurrentConversation({curr_conversation:existing_conversation.id}))
          dispatch(UpdatePersonalConversation({ conversation: data }));
        } else {
          dispatch(AddPersonalConversations({ conversation: data }));
        }
        dispatch(SelectConversation({ room_id: data._id }));
      };

      const handleNewMessage = (data) => {
        const message = data.message;
        if (pc_current_conversation?.id === data.conversation_id) {
          dispatch(
            AddPersonalMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      };

      socket.on("new_friend_request", handleNewFriendRequest);
      socket.on("request_sent", handleRequestSent);
      socket.on("accept_request", handleRequestAccepted);
      socket.on("start_chat", handleChat);
      socket.on("new_message", handleNewMessage);

      return () => {
        socket.off("new_friend_request");
        socket.off("request_sent");
        socket.off("accept_request");
        socket.off("start_chat");
        socket.off("new_message");
      };
    }
  }, [
    isLoggedIn,
    pc_conversations,
    pc_current_conversation,
    dispatch,
    user_id,
  ]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction="row">
      <Sidebar />
      <Outlet />
    </Stack>
  );
};
export default DashboardLayout;
