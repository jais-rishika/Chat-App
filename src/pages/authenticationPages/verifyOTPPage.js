import { Typography ,Stack} from "@mui/material";
import VerifyOTPForm from "../../sections/Authentication/verifyOTPForm";
const VerifyOTPPage=()=>{
    return(
        <>
            <Stack spacing={2}>
                <Typography variant="h4">Please Verify OTP</Typography>
                <Typography variant="body">Sent email to</Typography>
                <VerifyOTPForm/>
            </Stack>
        </>
    )
}
export default VerifyOTPPage;