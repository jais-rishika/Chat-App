import React from 'react';
import {Stack,Box,Typography,IconButton, Divider, Icon } from '@mui/material';
import {CircleDashed, MagnifyingGlass, ArchiveBox ,PushPin} from 'phosphor-react';
import { Search ,SearchIconWrapper ,StyledInputBase} from '../../components/reusable/search';
import { useTheme } from '@emotion/react';
import {ChatList}from '../../Data/data';
import {ChatElements,CustomScrollbar} from '../../components/ChatElements';
import {navitems} from './navitems';
import { useState } from 'react';


const Chat = () => {
    const theme = useTheme();
    const[selected,setSelected]=useState(0);
    return (
        <Box
            sx={{
                position: 'relative',
                height: "100vh",
                width: 300,
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

                <Stack direction="row" spacing={3}>
                    {navitems.map((ele) =>
                            
                            ele.index===selected?
                            (
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Box sx={{
                                        backgroundColor:theme.palette.primary.main,
                                        borderRadius: "25%",
                                        width: 'max-content'
                                    }}>
                                        <IconButton
                                        sx={{color: "#fff"}}
                                        key={ele.index}
                                        >
                                            {ele.icon}
                                        </IconButton>
                                    </Box>
                                    <Typography>{ele.title}</Typography>
                                </Stack>
                            )
                            :(
                            <IconButton
                                sx={{ width: "max-content" }}
                                key={ele.index}
                                onClick={()=>setSelected(ele.index)}
                            >
                                {ele.icon}
                            </IconButton>
                            )
                        )}
                </Stack>

                <Divider />
                
                <CustomScrollbar style={{ overflowY: 'scroll' }}>
                
                    <Stack>
                        <Stack direction="row" spacing={1}>
                            <PushPin size={20} />
                            <Typography variant='subtitle2' sx={{ color: "#676767" }}>Pinned</Typography>
                        </Stack>
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
