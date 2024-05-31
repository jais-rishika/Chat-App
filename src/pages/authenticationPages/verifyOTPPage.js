import { Typography ,Stack} from "@mui/material";
import VerifyOTPForm from "../../sections/Authentication/verifyOTPForm";
import { useSelector } from "react-redux";
import { CloseSnackBar } from "../../redux/slices/app";
import SnackBarIntegration from "../../components/SnackBar";
const VerifyOTPPage=()=>{
    const { openSnackBar, snackBarMessage, snackBarSeverity } = useSelector(
        (state) => state.app
    );
    return(
        <>
            <Stack spacing={2}>
                <Typography variant="h4">Please Verify OTP</Typography>
                <Typography variant="body">Sent email to</Typography>
                <VerifyOTPForm/>
            </Stack>
            {openSnackBar && (
                <SnackBarIntegration
                open={openSnackBar}
                severity={snackBarSeverity}
                message={snackBarMessage}
                CloseSnackBar={CloseSnackBar}
                />
            )}
        </>
    )
}
export default VerifyOTPPage;