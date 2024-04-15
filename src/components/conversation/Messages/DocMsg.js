import React from 'react';
import {Box,Stack,Typography} from "@mui/material";
import { useTheme } from '@emotion/react';
import {File, DownloadSimple} from 'phosphor-react';
import MessageOptions from './messageTypes';
const DocMsg = ({ele}) => {
    const theme=useTheme();
    return (
        <Stack direction='row' justifyContent={ele.incoming? 'right': 'left'} p={1}> 
            <Box p={1.5}
                sx={{
                backgroundColor: ele.incoming
                    ? theme.palette.background.default
                    : theme.palette.primary.main,
                borderRadius: 1.5,
                width: "max-content",
                }}
            >
            <Stack spacing={2}>
                <Stack direction='row' 
                p={2}
                spacing={3}
                alignItems={"center"}
                sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
                }}>
                    <File size={32} />
                    <Typography>Abstract.pdf</Typography>
                    <DownloadSimple size={32}/>
                </Stack>
                <Stack>
                    <Typography variant='body2' sx={{ color: ele.incoming ? theme.palette.text : "#fff" }}>{ele.message}</Typography>
                </Stack>
            </Stack>
            </Box>
            <MessageOptions/>
        </Stack>
    );
}

export default DocMsg;
