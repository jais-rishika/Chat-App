import { Typography ,Stack} from "@mui/material";
import ResetForm from "../../sections/Authentication/resetPasswordForm";
import { useSelector } from 'react-redux';
import { CloseSnackBar } from '../../redux/slices/app';
import SnackBarIntegration from '../../components/SnackBar';
const ResetPassword=()=>{
    const { openSnackBar, snackBarMessage, snackBarSeverity } = useSelector(
        (state) => state.app
      );
    return(
        <>
            <Stack spacing={2}>
                <Typography variant="h4">Forgot Password</Typography>
                <Typography variant="body">Please enter the email address associated with your account and we will email you a link to reset your password</Typography>
                <ResetForm/>
                {openSnackBar && (
                <SnackBarIntegration
                open={openSnackBar}
                severity={snackBarSeverity}
                message={snackBarMessage}
                CloseSnackBar={CloseSnackBar}
                />)}
            </Stack>
        </>
    )
}
export default ResetPassword;