import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { OpenSnackBar } from "../../redux/slices/app.js";
import { connectSocket, socket } from "../../utils/socketio.js";
import Sidebar from "./dashboard";
const DashboardLayout=()=>{
    const {isLoggedIn} =useSelector((state)=>state.auth)
    const user_id= window.localStorage.getItem("user_id")
    const dispatch=useDispatch();
    const Navigate=useNavigate();
    
    useEffect(()=>{
        if(isLoggedIn){
            window.onload=()=>{
                if(!window.location.hash){
                    window.location= window.location +"#loaded"
                    window.location.reload();
                }
            }
            // window.location.reload()
            if(!socket){
                connectSocket(user_id)
            }
            const handleSnackbar=(data)=>[
                dispatch(OpenSnackBar({severity: "success", message: data.message}))
            ]
            socket.on("new-friend-request",handleSnackbar)
            socket.on("request-sent",handleSnackbar)
            socket.on("accept-request",handleSnackbar)
            
            return ()=>{
                socket.off("new-friend-request",handleSnackbar)
                socket.off("request-sent",handleSnackbar)
                socket.off("accept-request",handleSnackbar)
                }
            }
    },[isLoggedIn, dispatch, user_id])
    
    if(!isLoggedIn){
        return (<Navigate to="/auth/login" />)
    }


    return(
        <Stack direction="row" >
            <Sidebar/>
            <Outlet/>
        </Stack>
    )
}
export default DashboardLayout;