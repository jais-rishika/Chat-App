import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSideBar } from "../../redux/slices/app";
import StyledBadge from "../reusable/StyledBadge";
const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mostusedcolor = theme.palette.primary.main;
  const { pc_current_conversation } = useSelector((state) => state.chat);
  const {room_id} =useSelector((state)=> state.app)
  useEffect(()=>{
    const fetchCurrentConversation = async () => {
      // Make an API call or fetch data from your store
      // to get the current conversation based on the room_id
      const currentConversation = await getCurrentConversation(room_id);
      dispatch(setCurrentConversation(currentConversation));
    };
    fetchCurrentConversation();
  },[room_id])
  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        height: "9%",
        borderBottom:
          theme.palette.mode === "light"
            ? "2px solid LightGrey"
            : "2px solid #222021",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,1)",
      }}
    >
      <Stack
        sx={{
          height: "100%",
          justifyContent: "space-between",
          alignContent: "center",
        }}
        direction="row"
      >
        <Stack
          direction="row"
          onClick={() => {
            dispatch(ToggleSideBar());
          }}
          sx={{ cursor: "pointer" }}
        >
          <Box>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                src={pc_current_conversation?.img}
                alt={pc_current_conversation?.name}
              ></Avatar>
            </StyledBadge>
          </Box>
          <Stack direction="column" sx={{ marginLeft: "15px" }}>
            <Typography variant="subtitle2">
              {pc_current_conversation?.name}
            </Typography>
            <Typography variant="caption">
              {pc_current_conversation?.status}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={3}>
          <IconButton>
            {" "}
            <Phone size={30} color={mostusedcolor} />{" "}
          </IconButton>
          <IconButton>
            {" "}
            <VideoCamera size={30} color={mostusedcolor} />{" "}
          </IconButton>
          <IconButton>
            {" "}
            <MagnifyingGlass size={30} color={mostusedcolor} />{" "}
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton>
            {" "}
            <CaretDown size={30} color={mostusedcolor} />{" "}
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
