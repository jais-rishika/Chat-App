import FormProvider from "../../react-hook-form/FormProvider";
import CustomTextField from "../../react-hook-form/CustomTextField";
import { Alert, Button , Link, Stack} from "@mui/material";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";

const NewPassword=()=> {
    const theme=useTheme();
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
    
    const methods=useForm({
        resolver: yupResolver(newPasswordSchema),
    })

    const {
        reset,
        setError,
        handleSubmit,
        formState: {errors}
    } =methods

    const onSubmit=async(data)=>{
        try{

        }
        catch(err){
            reset()
            setError("afterSubmit",{...err,message: err.message})
        }
    }
    return ( 
    <>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                {!!errors.afterSubmit && (<Alert severity="error">{errors.afterSubmit.message}</Alert>)}
                <CustomTextField name="newpassword" label="New Password"/>
                <CustomTextField name="confirmpassword" label="Confirm Password"/>

                <Button sx={{
                    bgcolor: "text.primary",
                    color: (theme)=>
                    theme.palette.mode==="light"? "common.white":"grey.800",
                    "&:hover":{
                        bgcolor: "text.primary",
                        color: (theme)=>
                        theme.palette.mode==="light"? "common.white":"grey.800",
                    }
                }}>SUBMIT</Button>
                <Link to="/auth/register" component={NavLink} variant="subtitle2"> Return to Sign In </Link>
                
            </Stack>
        </FormProvider>
    </> );
}

export default NewPassword;