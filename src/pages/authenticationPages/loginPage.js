import React from 'react'
import {Link, Stack,Typography} from '@mui/material';
import {NavLink} from 'react-router-dom'
import AuthSocial from '../../sections/Authentication/authSocial';
import LoginForm from '../../sections/Authentication/loginForm';
function LoginPage() {
    return (  
        <>
            <Stack direction="column" spacing={2} sx={{mt:2}}>
                <Typography variant='h4'>Login to Chatup</Typography>
                <Stack direction="row">
                    <Typography variant="body2">New User? </Typography>
                    <Link to="/auth/register" component={NavLink} variant="subtitle2"> Create an Account</Link>
                </Stack>
                <LoginForm/>

                <AuthSocial/>
            </Stack>
        </>
    );
}

export default LoginPage;