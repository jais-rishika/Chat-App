import { useTheme } from '@emotion/react';
import { Avatar, Badge, Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import StyledBadge from './reusable/StyledBadge';

export const CustomScrollbar = styled('div')({
  '&::-webkit-scrollbar': {
    width: '3px', // Width of the scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888', // Color of the scrollbar thumb
    borderRadius: '6px', // Border radius of the scrollbar thumb
    height: '10px;'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent', // Color of the scrollbar track
    //borderRadius: '2px', // Border radius of the scrollbar track
  },
});

export const ChatElements = ({id,img,name,msg,time,unread,online}) => {
    const theme=useTheme();
    const dispatch=useDispatch();
    return (
        <Box 
        // onClick={()=>{
        //   dispatch(SelectConversation({room_id:id}))
        // }}
        sx={{
            width: '100%' ,
            backgroundColor: theme.palette.mode === "light"? "#fff": theme.palette.background.default,
            borderRadius: 1.5,
            marginBottom: '10px'}}
            spacing={2} >
            <Stack sx={{width: '100%', justifyContent:'space-between', alignItems:'center'}} direction="row" p={2}>
                <Stack direction='row' sx={{width:'80%'}}>
                    {online===true?
                    (<StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot" >
                        <Avatar src={img}></Avatar>
                    </StyledBadge>)
                    :
                    (<Avatar src={img}></Avatar>)
                    }
                    <Stack direction="column" sx={{marginLeft: '15px' , overflow: 'hidden', whiteSpace: 'nowrap' ,justifyContent: 'center'}} >
                        <Typography variant='text'>{name}</Typography>
                        <Typography variant='caption' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{msg}</Typography>
                    </Stack>
                </Stack>
                <Stack direction="column" spacing={1} sx={{ alignItems:'center'}}>
                    <Typography variant='caption'>{time}</Typography>
                    <Badge color="primary" badgeContent={unread}></Badge>
                </Stack>
            </Stack>
        </Box>
    );
}

 
