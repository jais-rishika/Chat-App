import React from 'react'
import {Link, Stack,Typography} from '@mui/material';
import {NavLink} from 'react-router-dom'
import AuthSocial from '../../sections/Authentication/authSocial';
import RegisterForm from '../../sections/Authentication/registerForm';
const RegisterPage=()=> {
    return (  
        <>
            <Stack direction="column" spacing={2} sx={{mt:2}}>
                <Typography variant='h4'>Welcome to Chatup</Typography>
                <Stack direction="row">
                    <Typography variant="body2">Already have an account? </Typography>
                    <Link to="/auth/login" component={NavLink} variant="subtitle2"> Sign in</Link>
                </Stack>
                <RegisterForm/>
                
                <Typography
                    component={"div"}
                    sx={{
                    color: "text.secondary",
                    mt: 3,
                    typography: "caption",
                    textAlign: "center",
                    }}
                >
                    {"By signing up,I agree to "}
                    <Link underline="always" color="text.primary">
                    Terms of Service
                    </Link>
                    {" and "}
                    <Link underline="always" color="text.primary">
                    Privacy Policy
                    </Link>
                </Typography>

                <AuthSocial/>
                
            </Stack>
        </>
    );
}

export default RegisterPage;