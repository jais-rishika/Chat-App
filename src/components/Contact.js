import React from 'react';
import {Box, Avatar, Stack ,Typography ,Divider, IconButton, Button} from '@mui/material';
import {PhoneCall ,VideoCamera ,X,Star,Bell, Prohibit ,Trash,CaretRight } from 'phosphor-react';
import AntSwitch from './reusable/AntSwitch';
import { CustomScrollbar } from './ChatElements';
import {faker} from '@faker-js/faker';
import { useTheme } from '@emotion/react';
import { ToggleSideBar, UpdateSidebarType } from "../redux/slices/app";
import { dispatch } from '../redux/store';
const Contact = () => {
    const theme=useTheme();
    const mostusedcolor=theme.palette.primary.main
    return (
        <Box sx={{ width:'320px',
        height:'100vh',
        borderLeft: theme.palette.mode === "light"? '2px solid LightGrey':'2px solid #222021',
        backgroundColor: 
        theme.palette.mode==='light'?  "#F8FAFF"
        : theme.palette.background.paper,
        marginBottom: '10px'}}>
            <Stack direction="column" spacing={2} sx={{
            width:'100%',
            height:'100vh',
            }}>
                <Stack direction="row" p={2} sx={{justifyContent:"space-between", alignItems:'center',borderBottom: theme.palette.mode === "light"? '2px solid LightGrey':'2px solid #222021', height: '9%'}}>
                    <Typography variant="article">Contact</Typography>
                    <IconButton onClick={() => {
                        dispatch(ToggleSideBar());
                    }}>
                        <X size={32} color={mostusedcolor}/>
                    </IconButton>
                </Stack>

                <CustomScrollbar style={{ overflowY: 'scroll' }}>

                    <Stack direction="column" p={1}>
                        <Stack direction="row" spacing={1} sx={{justifyContent:"left", alignItems:'center'}}>
                            <Avatar src={faker.image.avatar()}/>
                            <Stack direction="column">
                                <Typography variant='body1'>DMC Dante</Typography>
                                <Typography variant='body1'>91+ 2438364738</Typography>
                            </Stack>
                        </Stack>

                        <Stack direction="row"  p={2} sx={{justifyContent:"space-around", alignItems:'center'}}>
                            <IconButton> <PhoneCall size={36} color={mostusedcolor} /></IconButton>
                            <IconButton> <VideoCamera size={36} color={mostusedcolor}/> </IconButton>
                        </Stack>

                        <Divider/>

                        <Stack direction="column" p={1}>
                            <Typography variant='h6' >About</Typography>
                            <Typography variant='subtitle1'>Sab Moh Maya he</Typography>
                        </Stack>

                        <Divider/>

                        <Stack direction="column" sx={{justifyContent:"center", alignItems:'left'}}>
                            <Stack direction="row" p={1} sx={{justifyContent:"space-between", alignItems:'center'}}>
                                <Typography variant='body1'>Media,Links,Docs</Typography>

                                <Stack direction='row' sx={{justifyContent:"center", alignItems:'center'}}>
                                    <IconButton
                                        onClick={()=>{
                                            dispatch(UpdateSidebarType("MEDIA"));
                                        }}>
                                        <CaretRight size={20} color={mostusedcolor} weight="bold"/> 
                                    </IconButton>
                                    121  
                                </Stack>
                            </Stack>

                            <Stack direction="row" p={2} spacing={2}>
                                <Avatar src={faker.image.avatar()}/>
                                <Avatar src={faker.image.avatar()}/>
                                <Avatar src={faker.image.avatar()}/>
                            </Stack>
                        </Stack>

                        <Divider/>

                        <Stack direction="row"  p={2} spacing={2} sx={{justifyContent:"space-between", alignItems:'center'}}>
                                <Stack direction="row" spacing={0.5} sx={{justifyContent:"left", alignItems:'center'}}>
                                    <IconButton> <Star size={30} color={mostusedcolor}/> </IconButton>
                                    <Typography variant='body1'>Starred Messages</Typography>
                                </Stack>

                                <IconButton> <CaretRight size={20} color={mostusedcolor} weight="bold" /> </IconButton>
                        </Stack>

                        <Divider/>

                        <Stack direction="row" p={2} spacing={0.5} sx={{justifyContent:"space-between", alignItems:'center'}}>
                            <Stack direction="row" spacing={0.5} sx={{justifyContent:"left", alignItems:'center'}}>
                                <IconButton> <Bell size={30} color={mostusedcolor}/> </IconButton>
                                <Typography variant='body1'>Mute Notifications</Typography>
                            </Stack>
                            <AntSwitch/>
                        </Stack>

                        <Divider/>

                        <Stack direction="column" p={2} >
                            <Typography variant='body1'>Groups in common</Typography>
                            <Stack direction="row" spacing={2} sx={{justifyContent:"left", alignItems:'center'}}>
                                <Avatar src={faker.image.avatar()}/>
                                <Stack direction="column" p={1} sx={{justifyContent:"center", alignItems:'left'}}>
                                    <Typography variant='subtitle1'>Friends</Typography>
                                    <Typography variant='subtitle2'>Rajan,Taniya,Rishika,Tanu</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction="row" p={2} spacing={2} sx={{justifyContent:"space-between", alignItems:'center'}}>
                                <Stack direction='row' sx={{justifyContent:"space-between", alignItems:'center',color:'#FF9843', border:"2px solid", paddingRight:'10px'}}>
                                    <Button>
                                        <IconButton><Prohibit size={16} color={mostusedcolor} weight="bold"/></IconButton>
                                        <Typography>Block</Typography>
                                    </Button>
                                </Stack>
                                <Stack direction='row' sx={{justifyContent:"space-between", alignItems:'center',color:'#FF9843', border:"2px solid", paddingRight:'10px'}} >
                                    <Button>
                                        <IconButton><Trash size={16} color={mostusedcolor} weight="bold" /></IconButton>
                                        <Typography>Clear</Typography>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </CustomScrollbar>
            </Stack>
        </Box>
    );
}
export default Contact;
