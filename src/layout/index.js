import { Stack } from "@mui/material"
import  Sidebar  from "../layout/Dashboard/dashboard"
import { Outlet } from "react-router-dom"

const DashboardLayout=()=>{
    return(
        <Stack direction="row" >
            <Sidebar/>
            <Outlet/>
        </Stack>
    )
}
export default DashboardLayout;