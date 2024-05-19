import { Typography ,Stack} from "@mui/material";
import NewPassword from "../../sections/Authentication/newPasswordForm";
const NewPasswordPage=()=>{
    return(
        <>
            <Stack spacing={2}>
                <Typography variant="h4">Reset Password</Typography>
                <Typography variant="body">Please set your new Password</Typography>
                <NewPassword/>
            </Stack>
        </>
    )
}
export default NewPasswordPage;