import React from 'react';
import {Stack,Box,Typography,IconButton,InputBase, Divider } from '@mui/material';
import {CircleDashed, MagnifyingGlass, ArchiveBox } from 'phosphor-react';
import { Search ,SearchIconWrapper ,StyledInputBase} from '../../components/search';
import { useTheme } from '@emotion/react';
import {ChatList}from '../../Data/data';
import {ChatElements,CustomScrollbar} from '../../components/ChatElements';
const Chat = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: 'relative',
                height: "100vh",
                width: 300,
                backgroundColor: "#F8FAFF",
                backgroundColor: 
                    theme.palette.mode==='light'?  "#F8FAFF"
                    : theme.palette.background.paper,
                boxShadow: "0px 0px 2px rgba(0,0,0,0.5)" 
            }}>
            
            <Stack sx={{height: "100vh"}} p={3} spacing={2}>
                <Stack direction="row" sx={{
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Typography variant="h5">Chats</Typography>
                    <IconButton sx={{ width: "max-content" }}>
                        <CircleDashed/>
                    </IconButton>
                </Stack>
                
                <Stack direction="row" sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#709CE6"
                }}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color="#709CE6" />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search..."
                            inputProps={{ "aria-label": "search" }}/>
                    </Search>
                </Stack>

                <Stack direction="row" sx={{
                    alignItems: "center",
                    color: "#709CE6"
                }}>
                    <IconButton sx={{ width: "max-content" }}>
                        <ArchiveBox size={24}/>
                    </IconButton>
                    <Typography variant="text" >Archived</Typography>
                </Stack>

                <Divider />
                
                <CustomScrollbar style={{ overflowY: 'scroll' }}>
                
                    <Stack>
                        <Typography variant='subtitle2' sx={{ color: "#676767" }}>Pinned</Typography>
                        {ChatList.filter((ele)=> ele.pinned).map((ele)=>{
                            return <ChatElements {...ele} key={ele.id}/>
                        })}
                    </Stack>

                    <Stack>
                        <Typography variant='subtitle2' sx={{ color: "#676767" }}>All Chats</Typography>
                        {ChatList.filter((ele)=> !ele.pinned).map((ele)=>{
                            return <ChatElements {...ele} key={ele.id}/>
                        })}
                    </Stack>
                
                </CustomScrollbar>

            </Stack>
        </Box>
    );
}

export default Chat;
