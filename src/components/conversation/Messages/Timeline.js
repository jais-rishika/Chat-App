import React from 'react';
import {Divider ,Stack, Typography} from '@mui/material';

const Timeline = () => {
    return (
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Divider width={'46%'}/>
                <Typography>Today</Typography>
            <Divider width={'46%'}/>
        </Stack>
    );
}

export default Timeline;
