import React from 'react'
import {Link, Stack,Typography} from '@mui/material';
import { CloseSnackBar } from '../../redux/slices/app';
import SnackBarIntegration from '../../components/SnackBar';
import { useSelector } from 'react-redux'
import CreateProfileForm from '../../sections/Authentication/createProfileForm';
export default function CreateProfile() {
    const { openSnackBar, snackBarMessage, snackBarSeverity } = useSelector(
        (state) => state.app
    );
  return (
    <Stack>
     <Typography align='center' variant="h4" sx={{mt: 3}}>Create Profile</Typography>
     <CreateProfileForm/>
        {openSnackBar && (
            <SnackBarIntegration
            open={openSnackBar}
            severity={snackBarSeverity}
            message={snackBarMessage}
            CloseSnackBar={CloseSnackBar}
            />
        )}
      </Stack>
  )
}
