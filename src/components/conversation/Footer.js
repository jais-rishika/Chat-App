import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LinkSimple, PaperPlaneTilt, Smiley } from "phosphor-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Action_Buttons } from "../../Data/data";
import { socket } from "../../utils/socketio";

let handleSendMessage
//styled Input
const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

//chat input
const ChatInput = ({
  emojiPicker,
  setEmojiPicker,
  setValue,
  value,
  inputRef,
}) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  const [openActions, setOpenActions] = useState(false);
  //define input element
  return (
    <StyledInput
      fullWidth
      inputRef={inputRef}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      placeholder="write Your Message"
      variant="filled"
      onKeyUp={handleKeyPress}
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack p={3} sx={{ width: "max-content" }}>
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none",
              }}
            >
              {Action_Buttons.map((ele,idx) => (
                <Tooltip placement="right" title={ele.title} key={idx}>
                  <Fab
                    sx={{
                      position: "absolute",
                      top: -ele.y,
                      backgroundColor: ele.color,
                    }}
                    aria-label="add"
                  >
                    {ele.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            {/* //links */}
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  setOpenActions((prev) => !prev);
                }}
              >
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          // emojis
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setEmojiPicker(!emojiPicker);
              }}
            >
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

//function linkify
function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}
//function containsUrl
function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

const Footer = () => {
  const theme = useTheme();
  const mostusedcolor = theme.palette.primary.main;
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [value, setValue] = useState("");
  const user_id = window.localStorage.getItem("user_id");
  const { room_id } = useSelector((state) => state.app);
  const { pc_current_conversation } = useSelector((state) => state.chat); //this is an id only needs to be an object
  const inputRef = useRef(null);
  handleSendMessage = () => {
    socket.emit("text_message", {
      message: linkify(value),
      conversation_id: pc_current_conversation?.id,
      from: user_id,
      to: pc_current_conversation?.user_id,
      type: containsUrl(value) ? "link" : "text",
    });
    setValue("");
  };
  function handleEmojiClick(emoji) {
    const input = inputRef.current;
    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;
      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }
  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        height: "10%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        spacing={3}
      >
        <Stack
          width={"100%"}
        >
          <Box
            sx={{
              display: emojiPicker ? "inline" : "none",
              zindex: 10,
              position: "fixed",
              bottom: 81,
              right: 100,
            }}
          >
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={(emoji) => {
                handleEmojiClick(emoji.native);
              }}
            />
          </Box>
          <ChatInput
            inputRef={inputRef}
            value={value}
            setValue={setValue}
            emojiPicker={emojiPicker}
            setEmojiPicker={setEmojiPicker}
          />
        </Stack>
        <Box
          sx={{
            height: 48,
            width: 48,
            borderRadius: 2,
          }}
        >
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton
              onClick={() => {
                handleSendMessage()
              }}
            >
              <PaperPlaneTilt size={32} color={mostusedcolor}/>
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
