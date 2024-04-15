import React from 'react';
import Chat from './Dashboard/Chat';
import Conversation from '../components/conversation/index';
import Contact from '../components/Contact';
const General = () => {
    return (
        <>
        <Chat/>
        <Conversation/>
        <Contact/>
        </>
    );
}

export default General;
