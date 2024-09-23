import { useTheme } from "@emotion/react";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../redux/slices/app";
import StyledBadge from "./reusable/StyledBadge";

export const CustomScrollbar = styled("div")({
  "&::-webkit-scrollbar": {
    width: "3px", // Width of the scrollbar
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888", // Color of the scrollbar thumb
    borderRadius: "6px", // Border radius of the scrollbar thumb
    height: "10px;",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent", // Color of the scrollbar track
    //borderRadius: '2px', // Border radius of the scrollbar track
  },
});

export const ChatElements = ({ id, img, name, msg, time, unread, online }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { room_id } = useSelector((state) => state.app);
  const selectChatId = room_id?.room_id.toString();
  let isSelected = selectChatId === id;
  return (
    <Box
      onClick={() => {
        dispatch(SelectConversation({ room_id: id }));
      }}
      sx={{
        width: "100%",
        borderRadius: 1.5,
        backgroundColor: isSelected
          ? theme.palette.mode === "light"
            ? alpha(theme.palette.primary.main, 0.5)
            : theme.palette.primary.main
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
        marginBottom: "10px",
      }}
      spacing={2}
    >
      <Stack
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        direction="row"
        p={2}
      >
        <Stack direction="row" sx={{ width: "80%" }}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img}></Avatar>
            </StyledBadge>
          ) : (
            <Avatar src={img}></Avatar>
          )}
          <Stack
            direction="column"
            sx={{
              marginLeft: "15px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              justifyContent: "center",
            }}
          >
            <Typography variant="text">{name}</Typography>
            <Typography
              variant="caption"
              sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
            >
              <span>{msg?.text}</span>
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
          <Typography variant="caption">{time}</Typography>
          <Badge color="primary" badgeContent={unread}></Badge>
        </Stack>
      </Stack>
    </Box>
  );
};
