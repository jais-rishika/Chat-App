import { useState } from 'react';
import {Avatar, Box,Divider,IconButton,Stack} from '@mui/material';
import { Gear } from 'phosphor-react';
import logo from "../../assets/images/logo.jpeg";
import {navitems} from './navitems';
import pfp from "../../assets/images/pfp.jpg"
import { useTheme } from "@mui/material/styles";
import useSettings from '../../hooks/useSettings';
import AntSwitch from '../../components/AntSwitch';
import { faker } from "@faker-js/faker";

  console.log("Dashboard")
const Sidebar = () => {
    const[selected,setSelected]=useState(0);
    const theme = useTheme();
    const { onToggleMode }=useSettings();
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
                        <Avatar src={logo} sx={{}}></Avatar>
                    </Box>
                <Stack
                    m={2}
                    direction="column"
                    alignItems={"center"}
                    justifyContent="space-between"
                    sx={{ height: "100%"}}
                    spacing={2}
                    >
                    <Stack>
                        {navitems.map((ele) =>
                            ele.index===selected?
                            (
                                <Box sx={{
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
                        <Divider sx={{width: "60px" , marginY:"1rem"}}/>
                        {selected===3?(
                            <Box sx={{
                                    backgroundColor:theme.palette.primary.main,
                                    borderRadius: "25%",
                                    width: 'max-content'
                                }}>
                                <IconButton
                                    sx={{width: "max-content", color: "#fff"}}
                                >
                                    <Gear size={36}/>
                                </IconButton>
                            </Box>
                        ):(
                            <IconButton onClick={()=>setSelected(3)}>
                                <Gear size={36}/>
                            </IconButton>
                        )}
                    </Stack>

                    <Stack spacing={2} alignItems="center" sx={{paddingBottom: '25px'}} >
                        <AntSwitch 
                            onChange={
                                ()=>{onToggleMode()
                            }}
                                defaultChecked
                            />
                        <Avatar src={faker.image.avatar()} />
                    </Stack>
                    
                </Stack>
            </Stack>
        </Box>
    </Stack>
    );
}
export default Sidebar;
