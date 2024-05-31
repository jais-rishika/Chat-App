import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import CustomTextField from "../../react-hook-form/CustomTextField";
import FormProvider from "../../react-hook-form/FormProvider";
import { Alert ,Stack,InputAdornment, IconButton, Link, Button} from "@mui/material";
import { useState } from "react";
import { Eye, EyeClosed } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../../redux/slices/auth'
import ProgressBarIntegration from '../../components/ProgressBar'

const LoginForm=()=>{
    
    const theme=useTheme();
    const dispatch=useDispatch()
    const isLoading= useSelector((state)=> state.auth)
    //created schema
    const LoginSchema=Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("should be a valid email address"),
        password: Yup.string()
            .required("Password is required")
            .min(6,"Password length should atleast be 6")
    })
    //declared default values
    const defaultValues={
        email: "",
        password: ""
    }
    //resolving values
    const methods=useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    })
    //destructuring values from methods
    const {
        reset,
        setError,
        handleSubmit,
        formState: {errors}
    } = methods;

    //Bussiness logic on what do do when form correct and submitted
    const onSubmit=async(data)=>{
        try{
            dispatch(loginUser(data));
        }
        catch(err){
        reset();
        setError("afterSubmit",{...err,message: err.message})
        } 
    }

    const[showPassword,setShowPassword]=useState(false);
    return(
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && (<Alert severity="error">{errors.afterSubmit.message}</Alert>)}
                <CustomTextField name="email" label="Email Address" />
                <CustomTextField 
                    name="password" 
                    label="Password"
                    type={showPassword? "text":"Password"}
                    InputProps={{
                        endAdornment:(
                          <InputAdornment>
                            <IconButton onClick={()=>setShowPassword(!showPassword)}>
                                {showPassword?<Eye/> :<EyeClosed/>}
                            </IconButton>
                          </InputAdornment>
                        )
                        
                    }} />
                    <Link to="/auth/reset-password" component={NavLink} variant="subtitle2" textAlign="right"> Forgot Password?</Link>
                    <Button type= "submit" sx={{
                        bgcolor:"text.primary",
                        color: (theme) =>
                        theme.palette.mode === "light" ? "common.white" : "grey.800",
                        "&:hover": {
                        bgcolor:"text.primary",
                        color: (theme) =>
                            theme.palette.mode === "light" ? "common.white" : "grey.800",
                        },
                    }}>
                    {isLoading ? "Please wait..." : "LOGIN"}
                    </Button>
                    {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
            </Stack>
        </FormProvider>
    )
}
export default LoginForm;