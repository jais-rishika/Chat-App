import React from 'react';
import {Box,Stack,Typography} from "@mui/material";
import { useTheme } from '@emotion/react';
import MessageOptions from './messageTypes';

const TextMsg = ({ele}) => {
    const theme=useTheme();
    return (
            <Stack direction='row' justifyContent={ele.incoming? 'right': 'left'} p={1}> 
                <Box
                p={1.5}
                sx={{
                backgroundColor: ele.incoming
                    ? theme.palette.background.default
                    : theme.palette.primary.main,
                borderRadius: 1.5,
                width: "max-content",
                }}>
                    <Typography
                        variant='body1'
                        color={ele.incoming? theme.palette.txt: '#fff'}
                    >
                        {ele.message}
                    </Typography>
                </Box>  
                <MessageOptions/>
            </Stack>
    );
}

export default TextMsg;
