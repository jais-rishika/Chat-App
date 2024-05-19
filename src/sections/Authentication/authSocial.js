import { Divider, Stack ,IconButton } from "@mui/material";
import {GoogleLogo,FacebookLogo} from "phosphor-react"
const AuthSocial=()=> {
    return (  
    <>
        <Stack>
            <Divider sx={{
                typography: "overline",
                color: "text.disabled",
            }}>
                or
            </Divider>
            <Stack direction="row" justifyContent={"center"} spacing={2}>
                <IconButton>
                    <GoogleLogo size={32} color="#ff0000" />
                </IconButton>
                <IconButton>
                    <FacebookLogo size={32} color="#0471d7" />
                </IconButton>
            </Stack>
        </Stack>
    </>);
}

export default AuthSocial;