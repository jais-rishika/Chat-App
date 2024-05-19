import FormProvider from "../../react-hook-form/FormProvider";
import CustomTextField from "../../react-hook-form/CustomTextField";
import { Alert, Button , Link, Stack} from "@mui/material";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";

const ResetForm=()=> {
    const theme=useTheme();
    const resetFormSchema=Yup.object().shape({
        email: Yup.string()
        .required("This is required")
        .email("Write a valid email")
    })
    const defaultValues = {
        email: "",
      };
    const methods=useForm({
        resolver: yupResolver(resetFormSchema),
        defaultValues
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
                <CustomTextField name="email" label="Email"/>
                <Button sx={{
                    bgcolor: "text.primary",
                    color: (theme)=>
                    theme.palette.mode==="light"? "common.white":"grey.800",
                    "&:hover":{
                        bgcolor: "text.primary",
                        color: (theme)=>
                        theme.palette.mode==="light"? "common.white":"grey.800",
                    }
                }}>SEND RESET EMAIL</Button>
                <Link to="/auth/register" component={NavLink} variant="subtitle2"> Return to Sign In </Link>
                
            </Stack>
        </FormProvider>
    </> );
}

export default ResetForm;