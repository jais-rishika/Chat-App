import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { Stack, Alert,InputAdornment, IconButton, Button } from '@mui/material'
import FormProvider from '../../react-hook-form/FormProvider'
import CustomTextField from '../../react-hook-form/CustomTextField'
import { Eye, EyeClosed } from 'phosphor-react'
import { useTheme } from '@emotion/react'

const RegisterForm=()=> {
    const theme=useTheme();
    //schema
    const RegisterSchema=Yup.object().shape({
        email: Yup.string()
            .required("This is Required")
            .email("email should be valid"),
        password: Yup.string()
            .required("This is Required")
            .min(6,"Password should be of atleast 6 length"),
        confirmPassword: Yup.string()
            .required("Field can't be empty")
            .oneOf(
                [Yup.ref("password"),null],
                "password and confirm password should be same"
            )
    })
    //default values
    
    //resolver
    const methods=useForm({
        resolver: yupResolver(RegisterSchema)
    })
    //destructure
    const {
        reset,
        setError,
        handleSubmit,
        formState: {errors}
    } = methods;
        
    //business logic
    const onSubmit=async(data)=>{
        try{

        }
        catch(err){
            reset();
            setError("afterSubmit",{...err,message:err.message})
        }
    }
    //useState
    const [showPassword,setShowPassword]=useState("false")
    return ( 
        <>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                {!!errors.afterSubmit && (<Alert severity='error'>{errors.afterSubmit.message}</Alert>)}
                <CustomTextField name="email" label="Email Address"/>
                <CustomTextField 
                    name="password" 
                    label="Password"
                    type={showPassword? "text": "Password"}
                    InputProps={{
                        endAdornment:(
                          <InputAdornment>
                            <IconButton onClick={()=>setShowPassword(!showPassword)}>
                                {showPassword? <Eye/>: <EyeClosed/>}
                            </IconButton>
                          </InputAdornment>
                        )  
                    }}
                    />
                <CustomTextField 
                    name="confirmPassword" 
                    label="Confirm Password"
                    type={showPassword? "text": "Password"}
                    InputProps={{
                        endAdornment:(
                          <InputAdornment>
                            <IconButton onClick={()=>setShowPassword(!showPassword)}>
                                {showPassword? <Eye/>: <EyeClosed/>}
                            </IconButton>
                          </InputAdornment>
                        )
                    }}
                    />
                <Button sx={{
                    bgcolor: "text.primary",
                    color: (theme)=>
                    theme.palette.mode==="light"? "common.white":"grey.800"
                }}
                    
                >
                    REGISTER
                </Button>
            </Stack>
        </FormProvider>
        </>
    );
}

export default RegisterForm
