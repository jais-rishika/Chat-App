import { Avatar, Box, IconButton, Stack } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import eyes from "../../assets/images/eyes.jpg";
import AntSwitch from '../../components/reusable/AntSwitch';
import useSettings from '../../hooks/useSettings';
import NotificationsDialog from '../../sections/Dialogs/NotificationsDialog';
import UserDialog from '../../sections/Dialogs/UsersDialog';
import { sidebaritems } from './sidebarItems';

const Sidebar = () => {
    const[selected,setSelected]=useState(0);
    const navigate=useNavigate()
    const handleClick= ()=>{
        navigate("/profile")
    }

    //user Dialog
    const [userDialogOpen,setUserDialogOpen]=useState(false);
    const closeUserDialog=()=>{
        setUserDialogOpen(false)
        setSelected(1)
    }

    //Notification Dialog
    const [notificationDialogOpen,setNotificationDialogOpen]=useState(false);
    const closeNotificationDialog=()=>{
        setNotificationDialogOpen(false)
        setSelected(1)
    }

    //side bar paths
    const getPath=(index)=>{
        switch(index){
            case 1:
                return '/app'
            case 4:
                return '/settings'
            default:
                return '/app'
        }
    }
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
                                <Box key={ele.index} sx={{
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
                                onClick={()=>{
                                    setSelected(ele.index);
                                    // navigate(getPath(ele.index))
                                    switch(ele.index){
                                        case 0:
                                            return
                                        case 1:
                                            navigate(getPath(ele.index))
                                            break;
                                        case 2:
                                            setUserDialogOpen(true)
                                            break;
                                        case 3:
                                            setNotificationDialogOpen(true)
                                            break;
                                        case 4:
                                            navigate(getPath(ele.index))
                                            break;
                                        default:
                                            navigate(getPath(ele.index))
                                    }
                                    }}
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
        {userDialogOpen && (
            <UserDialog open={userDialogOpen} handleClose={closeUserDialog} />
          )}
        {notificationDialogOpen && (
            <NotificationsDialog open={notificationDialogOpen} handleClose={closeNotificationDialog} />
          )}
    </Stack>
    );
}
export default Sidebar;
