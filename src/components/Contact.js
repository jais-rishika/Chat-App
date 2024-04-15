import React from 'react';
import {Box, Avatar, Stack , ImageIcon ,Typography ,Divider, IconButton} from '@mui/material';
import {PhoneCall ,VideoCamera ,X,Star,Bell, Prohibit ,Trash,CaretRight } from 'phosphor-react';
import AntSwitch from './AntSwitch';
import { CustomScrollbar } from './ChatElements';
import {faker} from '@faker-js/faker';
import { useTheme } from '@emotion/react';
const Contact = () => {
    const theme=useTheme();
    return (
        <Box sx={{ width:'320px',
        height:'100vh',
        backgroundColor: 
        theme.palette.mode==='light'?  "#F8FAFF"
        : theme.palette.background.paper,
        marginBottom: '10px'}}>
            <Stack direction="column" spacing={2} sx={{
            width:'100%',
            height:'100vh',
            }}>
                <Stack direction="row" p={2} sx={{justifyContent:"space-between", alignItems:'center',borderBottom: theme.palette.mode === "light"? '2px solid LightGrey':'', height: '9%'}}>
                    <Typography variant="h5">Contact</Typography>
                    <IconButton><X size={32} /></IconButton>
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
                            <PhoneCall size={36} />
                            <VideoCamera size={36} />
                        </Stack>

                        <Divider/>

                        <Stack direction="column" p={1}>
                            <Typography variant='h6'>About</Typography>
                            <Typography variant='subtitle1'>Sab Moh Maya he</Typography>
                        </Stack>

                        <Divider/>

                        <Stack direction="column" sx={{justifyContent:"center", alignItems:'left'}}>
                            <Stack direction="row" p={1} sx={{justifyContent:"space-between", alignItems:'center'}}>
                                <Typography variant='body1'>Media,Links,Docs</Typography>

                                <Stack direction='row' sx={{justifyContent:"center", alignItems:'center'}}>
                                    <Typography variant='body1'>121</Typography>
                                    <CaretRight size={20} color="#3660c4" weight="bold" />
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
                                    <Star size={32} />
                                    <Typography variant='body1'>Starred Messages</Typography>
                                </Stack>

                                <CaretRight size={20} color="#3660c4" weight="bold" />
                        </Stack>

                        <Divider/>

                        <Stack direction="row" p={2} spacing={0.5} sx={{justifyContent:"space-between", alignItems:'center'}}>
                            <Stack direction="row" spacing={0.5} sx={{justifyContent:"left", alignItems:'center'}}>
                                <Bell size={32} />
                                <Typography variant='body1'>Mute Notifications</Typography>
                            </Stack>
                            <AntSwitch/>
                        </Stack>

                        <Divider/>

                        <Stack direction="column" p={2} >
                            <Typography variant='body1'>One group in common</Typography>

                            <Stack direction="row" spacing={2} sx={{justifyContent:"left", alignItems:'center'}}>
                                <Avatar src={faker.image.avatar()}/>

                                <Stack direction="column" p={1} sx={{justifyContent:"center", alignItems:'left'}}>
                                    <Typography variant='subtitle1'>Friends</Typography>
                                    <Typography variant='subtitle2'>Rajan,Taniya,Rishika,Tanu</Typography>
                                </Stack>
                            </Stack>

                            <Stack direction="row" p={2} spacing={2} sx={{justifyContent:"space-between", alignItems:'center'}}>
                                <Stack direction='row' sx={{justifyContent:"space-between", alignItems:'center',color:'#3660c4', border:"1px solid", paddingRight:'10px'}} >
                                    <IconButton><Prohibit size={16} color="#3660c4" /></IconButton>
                                    <Typography>Block</Typography>
                                </Stack>

                                <Stack direction='row' sx={{justifyContent:"space-between", alignItems:'center',color:'#3660c4', border:"1px solid", paddingRight:'10px'}} >
                                    <IconButton><Trash size={16} color="#3660c4" /></IconButton>
                                    <Typography>Clear</Typography>
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
