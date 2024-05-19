import { Typography ,Stack} from "@mui/material";
import ResetForm from "../../sections/Authentication/resetForm";
const ResetPassword=()=>{
    return(
        <>
            <Stack spacing={2}>
                <Typography variant="h4">Forgot Password</Typography>
                <Typography variant="body">Please enter the email address associated with your account and we will email you a link to reset your password</Typography>
                <ResetForm/>
            </Stack>
        </>
    )
}
export default ResetPassword;