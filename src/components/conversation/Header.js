import { useTheme } from "@emotion/react";
import { faker } from "@faker-js/faker";
import { Avatar, Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { useDispatch } from "react-redux";
import { ToggleSideBar } from "../../redux/slices/app";
import StyledBadge from "../reusable/StyledBadge";
const Header = (props) => {
    const theme=useTheme();
    const dispatch = useDispatch();
    const mostusedcolor=theme.palette.primary.main
    return (
    <Box
      p={2}
      sx={{
        width: "100%",
        height: '9%',
        borderBottom: theme.palette.mode === "light"? '2px solid LightGrey':'2px solid #222021',
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,1)",
      }}>
           <Stack sx={{height: '100%' ,justifyContent:'space-between', alignContent: 'center'}} direction='row'>
                <Stack direction='row' onClick={() => {
                    dispatch(ToggleSideBar());}}
                    sx={{cursor: "pointer"}}
                >
                    <Box>
                        <StyledBadge overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot" >
                            <Avatar src={faker.image.avatar()}></Avatar>
                        </StyledBadge>
                    </Box>
                    <Stack direction="column" sx={{marginLeft: '15px' ,}} >
                        <Typography variant='subtitle2'>{props.name}</Typography>
                        <Typography variant='caption'>Online</Typography>
                    </Stack>
                </Stack>
                
                <Stack direction='row' spacing={3}>
                    <IconButton> <Phone size={30} color={mostusedcolor} /> </IconButton>
                    <IconButton> <VideoCamera size={30} color={mostusedcolor}/> </IconButton>
                    <IconButton> <MagnifyingGlass size={30} color={mostusedcolor}/> </IconButton>
                    <Divider orientation="vertical"/>
                    <IconButton> <CaretDown size={30} color={mostusedcolor}/> </IconButton>
                </Stack>
           </Stack> 
        </Box>
    );
}

export default Header;

