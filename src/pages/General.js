import React from 'react';
import Chat from './Dashboard/Chat';
import Conversation from '../components/conversation/index';
import Contact from '../components/Contact';
import { useSelector } from 'react-redux';
import { Box, Stack} from '@mui/material';

const General = () => {

  const { sidebar } = useSelector((state) => state.app);
    return (
        <Stack direction="row">
          <Chat/>
          <Box
            sx={{
              height: "100%",
              // width: "calc(100vw - 420px)",
              width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
              }}>
            <Conversation />
          </Box>
          
          {sidebar.open && <Contact/>}
        </Stack>
    );
}

export default General;
