import FormProvider from "../../react-hook-form/FormProvider";
import CustomTextField from "../../react-hook-form/CustomTextField";
import { Alert, Button , Link, Stack} from "@mui/material";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import ProgressBarIntegration from "../../components/ProgressBar";
import { useDispatch ,useSelector } from "react-redux";
import { ResetPassword } from "../../redux/slices/auth";

const ResetForm=()=> {
    const {isLoading} =useSelector((state)=> state.auth)
    const dispatch=useDispatch()
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
        const email=data.email
        try{
            dispatch(ResetPassword({email}))
        }
        catch(err){
            console.log(err)
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
                <Button type=" submit" sx={{
                    bgcolor: "text.primary",
                    color: (theme)=>
                    theme.palette.mode==="light"? "common.white":"grey.800",
                    "&:hover":{
                        bgcolor: "text.primary",
                        color: (theme)=>
                        theme.palette.mode==="light"? "common.white":"grey.800",
                    }
                }}>
                {isLoading ? "Please wait..." : "SEND RESET EMAIL"}
                {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
                </Button>
                <Link to="/auth/register" component={NavLink} variant="subtitle2"> Return to Sign In </Link>
            </Stack>
        </FormProvider>
    </> );
}

export default ResetForm;