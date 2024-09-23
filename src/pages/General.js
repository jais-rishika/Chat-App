import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import eyes from '../assets/images/eyes.jpg';
import Contact from '../components/Contact';
import Conversation from '../components/conversation/index';
import Chat from './Dashboard/Chat';
const General = () => {

  const { sidebar ,chat_type, room_id } = useSelector((state) => state.app);
    return (
      <>
        <Stack direction="row">
          <Chat/>
          <Box
            sx={{
              height: "100%",
              width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
              }}>
            {
               room_id!==null  && chat_type === "individual" ? (
                <Conversation/>
              ):(
                <Stack 
                  spacing={2}
                  sx={{height: "100%", width: "100%" , alignItems:"center" , justifyContent:"center"}}
                  >
                    <img src={eyes} alt="logo" width={280} height={250} />
                    <Typography variant="body">Welcome to ChatUp</Typography>
                </Stack>
              )
            }
          </Box>
          
          {sidebar.open && <Contact/>}
        </Stack>
        </>
    );
}

export default General;
