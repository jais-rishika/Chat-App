import { useState } from 'react';
import {Avatar, Box,Divider,IconButton,Menu,MenuItem,Stack} from '@mui/material';
import { Gear } from 'phosphor-react';
import logo from "../../assets/images/logo.jpeg";
import {navitems} from './navitems';
import { useTheme } from "@mui/material/styles";
import useSettings from '../../hooks/useSettings';
import AntSwitch from '../../components/reusable/AntSwitch';
import {Profile_Options} from '../../Data/data'
import {useDispatch, useSelector} from "react-redux"
import { logOutUser } from '../../redux/slices/auth';
const Sidebar = () => {
    
    const dispatch=useDispatch()
    const [anchorEl,setAnchorEl]=useState(null)
    const handleClick= (event)=>{
        setAnchorEl(event.currentTarget)
    }
    const handleClose= ()=>{
        setAnchorEl(null)
    }
    const open=Boolean(anchorEl)
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
                        <Avatar src={logo}></Avatar>
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
                        <Avatar src={profileImageUrl} 
                            id="basic-button"
                            aria-controls={open? "basic-menu": undefined}
                            aria-haspopup="true"
                            aria-expanded={open? "true":undefined}
                            onClick={handleClick}
                            sx={{cursor: "pointer"}}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                            transformOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                        >
                        <Stack spacing={1} px={1}>
                            {Profile_Options.map((ele) => (
                            <MenuItem onClick={()=>{
                                if(ele.index===1)
                                {
                                    dispatch(logOutUser())
                                }
                            }}>
                                
                                {ele.title}
                            </MenuItem>
                            ))}
                        </Stack>
                        </Menu>
                    </Stack>
                    
                </Stack>
            </Stack>
        </Box>
    </Stack>
    );
}
export default Sidebar;
