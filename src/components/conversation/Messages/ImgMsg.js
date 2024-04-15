import React from 'react';
import {Box,Stack,Typography} from "@mui/material";
import { useTheme } from '@emotion/react';
import MessageOptions from './messageTypes';

const ImgMsg = ({ele}) => {
    const theme=useTheme();
    return (
        <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
            <Box p={1.5}
            sx={{
                backgroundColor: ele.incoming
                    ? theme.palette.background.default
                    : theme.palette.primary.main,
            borderRadius: 1.5,
            width: '40%',
            maxHeight:'210'
            }}>
                <Stack direction='column' spacing={1}>
                    <img 
                        src={ele.img}
                        alt={ele.message}
                        style={{borderRadius:'10',maxHeight:'210'}}
                        />
                    <Typography
                        variant="body2"
                        color={ele.incoming ? theme.palette.text : "#fff"}
                    >
                        {ele.message}
            </Typography>
                </Stack>
            </Box>
            <MessageOptions/>
        </Stack>
    );
}

export default ImgMsg;
