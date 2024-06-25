import { useState } from 'react';
import {Avatar, Box,Divider,IconButton,Stack} from '@mui/material';
import { Gear } from 'phosphor-react';
import eyes from "../../assets/images/eyes.jpg";
import { sidebaritems } from './sidebarItems';
import { useTheme } from "@mui/material/styles";
import useSettings from '../../hooks/useSettings';
import AntSwitch from '../../components/reusable/AntSwitch';
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate=useNavigate()
    const handleClick= ()=>{
        navigate("/profile")
    }
    const[selected,setSelected]=useState(0);
    const theme = useTheme();
    const { onToggleMode }=useSettings();
    const {profileImageUrl}=useSelector((state)=>state.auth)
    return (
        <Stack direction="row" spacing={5} >
            <Box p={1} 
                sx={{
                    height: "100vh", 
                    width: 100,
                    background: theme.palette.background.paper,
                    boxShadow:"0px 0px 2px rgba(0,0,0,0.5)",
                    justifyContent:"center",
            }}>
            <Stack alignItems="center"
                    direction="column"
                    spacing={3}
                sx={{
                    width: 100,
                    height: "100vh"
                }}>
                    <Box sx={{
                        height: 'max-content',
                        width: 'max-content',
                    }}>
                        <Avatar src={eyes}></Avatar>
                    </Box>
                <Stack
                    m={2}
                    direction="column"
                    alignItems={"center"}
                    justifyContent="space-between"
                    sx={{ height: "100%"}}
                    spacing={2}
                    >
                    <Stack spacing={2}>
                        {sidebaritems.map((ele) =>
                            
                            ele.index===selected?
                            (
                                <Box  sx={{
                                    backgroundColor:theme.palette.primary.main,
                                    borderRadius: "25%",
                                    width: 'max-content'
                                }}>
                                    <IconButton
                                    sx={{color: "#fff"}}
                                    key={ele.index}
                                    >
                                        {ele.icon}
                                    </IconButton>
                                </Box>
                            )
                            :(
                            <IconButton
                                sx={{ width: "max-content" }}
                                key={ele.index}
                                onClick={()=>setSelected(ele.index)}
                            >
                                {ele.icon}
                            </IconButton>
                            )
                        )}
                    </Stack>

                    <Stack spacing={2} alignItems="center" sx={{paddingBottom: '25px'}} >
                        <AntSwitch 
                            onChange={
                                ()=>{onToggleMode()
                            }}
                                defaultChecked
                            />
                        <Avatar src={profileImageUrl} 
                            id="basic-button"
                            onClick={handleClick}
                            sx={{cursor: "pointer"}}
                        />
                        
                    </Stack>
                    
                </Stack>
            </Stack>
        </Box>
    </Stack>
    );
}
export default Sidebar;
