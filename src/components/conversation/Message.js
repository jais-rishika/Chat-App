import React from 'react';
import {Box,Stack} from "@mui/material";
import { useTheme } from '@emotion/react';
import {Chat_History} from '../../Data/data'
import { CustomScrollbar } from '../ChatElements';
import Timeline from './Messages/Timeline';
import DocMsg from './Messages/DocMsg';
import ReplyMsg from './Messages/ReplyMsg';
import ImgMsg from './Messages/ImgMsg';
import LinkMsg from './Messages/LinkMsg';
import TextMsg from './Messages/TextMsg';


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
              {Chat_History.map((msg)=>{
                  switch(msg.type){
                    case "divider":
                      return <Timeline ele={msg}/>
                    case 'msg':
                      switch(msg.subtype){
                        case "doc":
                          return <DocMsg ele={msg}/>
                        case "link":
                          return <LinkMsg ele={msg}/>
                        case "img":
                          return <ImgMsg ele={msg}/>
                        case "reply":
                          return <ReplyMsg ele={msg}/>
                        default:
                          return <TextMsg ele={msg}/>
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
