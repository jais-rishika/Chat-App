import { Container,Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/images/logo.jpeg";
const AuthLayout=() =>{
    console.log("Auth")
    return ( 
        <>
            <Container sx={{ mt: 5 }} maxWidth="sm">
                <Stack spacing={5}>
                    <Stack 
                        sx={{ width: "100%" }}
                        direction={"column"}
                        alignItems={"center"}
                    >
                        <img style={{ height: 120, width: 120, borderRadius:25  }} src={Logo} alt="Logo" />
                    </Stack>
                </Stack>
                <Outlet/>
            </Container>
        </> 
    );
}

export default AuthLayout;