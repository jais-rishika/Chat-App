import React from 'react';
import Header from './Header';
import Message from './Message';
import Footer from './Footer';
import {Stack} from '@mui/material'
const Conversation = () => {
    return (

            <Stack direction='column' sx={{width: '100%', height: '100vh'}} >
                <Header/>
                <Message/>
                <Footer/>
            </Stack>

    );
}

export default Conversation;
