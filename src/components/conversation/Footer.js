import React from 'react';
import {Box,IconButton,Stack,Typography,} from "@mui/material";
import { useTheme } from '@emotion/react';
import { Link,Smiley,PaperPlaneTilt } from 'phosphor-react';
import { StyledInputBase } from '../search';
const Footer = () => {
    const theme=useTheme();
    return (
        <Box sx={{
            width: "100%",
            height: '10%',
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}>
            <Stack direction='row' sx={{width: '100%', alignItems: 'center', justifyContent: 'space-between' , 
            border: '2px', paddingX:'25px'}}>
                <Stack direction='row' spacing={2} sx={{ alignItems: 'center',width: '100%'}}>
                    <Box sx={{backgroundColor: theme.palette.mode === "light"? "#fff": theme.palette.background.default , borderRadius: '25%' ,paddingX: '10px', paddingY: '6px'}}>
                        <Link size={32}/>
                    </Box>
                    <StyledInputBase placeholder="Write a Message..."
                            inputProps={{ "aria-label": "search" }}
                            sx={{border: `1px solid ${theme.palette.background.default}`, width: '100%', backgroundColor: theme.palette.background.neutral}}
                            />
                </Stack>
                <Stack direction='row' spacing={2} p={2} sx={{justifyContent: 'center' ,alignItems: 'center'}}>
                    <Box sx={{backgroundColor: theme.palette.mode === "light"? "#fff": theme.palette.background.default , borderRadius: '25%' ,paddingX: '10px', paddingY: '6px'}}>
                        <Smiley size={32}  />
                    </Box>
                    <Box sx={{backgroundColor: theme.palette.mode === "light"? "#fff": theme.palette.background.default , borderRadius: '25%' ,paddingX: '10px', paddingY: '6px'}}>
                        <PaperPlaneTilt size={32}  /> 
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Footer;
