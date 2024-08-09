import { useTheme } from '@emotion/react';
import { Box, Stack } from "@mui/material";
import React from 'react';
import { Chat_History } from '../../Data/data';
import { CustomScrollbar } from '../ChatElements';
import DocMsg from './Messages/DocMsg';
import ImgMsg from './Messages/ImgMsg';
import LinkMsg from './Messages/LinkMsg';
import ReplyMsg from './Messages/ReplyMsg';
import TextMsg from './Messages/TextMsg';
import Timeline from './Messages/Timeline';


const Message = () => {
        const theme=useTheme();
    return (
      <CustomScrollbar style={{ overflowY: 'scroll' ,overflowX: 'hidden'}}>
        <Box sx={{
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.neutral,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
          p={1}>
            <Stack direction='column'>
              {Chat_History.map((msg, idx)=>{
                  switch(msg.type){
                    case "divider":
                      return <Timeline ele={msg} key={idx}/>
                    case 'msg':
                      switch(msg.subtype){
                        case "doc":
                          return <DocMsg ele={msg} key={idx}/>
                        case "link":
                          return <LinkMsg ele={msg} key={idx}/>
                        case "img":
                          return <ImgMsg ele={msg} key={idx}/>
                        case "reply":
                          return <ReplyMsg ele={msg} key={idx}/>
                        default:
                          return <TextMsg ele={msg} key={idx}/>
                      }
                    default:
                      return <></>;
                  }
              })}
              </Stack>
        </Box>
      </CustomScrollbar>
    );
}

export default Message;
