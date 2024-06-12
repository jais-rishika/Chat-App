import { Typography ,Stack} from "@mui/material";
import NewPassword from "../../sections/Authentication/newPasswordForm";
import { useSelector } from 'react-redux';
import { CloseSnackBar } from '../../redux/slices/app';
import SnackBarIntegration from '../../components/SnackBar';
const NewPasswordPage=()=>{
    const { openSnackBar, snackBarMessage, snackBarSeverity } = useSelector(
        (state) => state.app
      );
    return(
        <>
            <Stack spacing={2}>
                <Typography variant="h4">Reset Password</Typography>
                <Typography variant="body">Please set your new Password</Typography>
                <NewPassword/>
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
export default NewPasswordPage;