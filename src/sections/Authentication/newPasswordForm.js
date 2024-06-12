import FormProvider from "../../react-hook-form/FormProvider";
import CustomTextField from "../../react-hook-form/CustomTextField";
import { Alert, Button , Link, Stack, InputAdornment ,IconButton} from "@mui/material";
import { Eye, EyeClosed } from 'phosphor-react'
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import ProgressBarIntegration from "../../components/ProgressBar";
import { useDispatch ,useSelector  } from "react-redux";
import { newPassword } from "../../redux/slices/auth";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
const NewPassword=()=> {
    const theme=useTheme();
    
    //learn about this
    const [queryParameters] = useSearchParams();
    const dispatch=useDispatch()
    const newPasswordSchema=Yup.object().shape({
        password: Yup.string()
        .required("This is Required")
        .min(6,"Password should be of atleast 6 length"),

        confirmPassword: Yup.string()
        .required("Field can't be empty")
        .oneOf([Yup.ref("password"),null],
        "Confirm password should be same as New Password"
    )
    })
    
    const defaultValues = {
        password:"",
        confirmPassword:""
      };

    const methods=useForm({
        resolver: yupResolver(newPasswordSchema),
        defaultValues,
    })

    const {
        reset,
        setError,
        handleSubmit,
        formState: {errors}
    } =methods

    const onSubmit=async(data)=>{
        try{
            const password = data.password;
            dispatch(newPassword({ password, token: queryParameters.get("code") }));
        }
        catch(err){
            reset()
            setError("afterSubmit",{...err,message: err.message})
        }
    }
    const [showPassword,setShowPassword]=useState(false)
    const {isLoading} =useSelector((state)=> state.auth)
    return ( 
    <>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                {!!errors.afterSubmit && (<Alert severity="error">{errors.afterSubmit.message}</Alert>)}
                <CustomTextField 
                    name="password" 
                    label="password" 
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
                    label="confirmPassword" 
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

                <Button  type="submit"
                    sx={{
                    bgcolor: "text.primary",
                    color: (theme)=>
                    theme.palette.mode==="light"? "common.white":"grey.800",
                    "&:hover":{
                        bgcolor: "text.primary",
                        color: (theme)=>
                        theme.palette.mode==="light"? "common.white":"grey.800",
                    }
                }}>
                {isLoading ? "Please wait..." : "SUBMIT"}
                {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
                </Button>
                <Link to="/auth/register" component={NavLink} variant="subtitle2"> Return to Sign In </Link>
                
            </Stack>
        </FormProvider>
    </> );
}

export default NewPassword;