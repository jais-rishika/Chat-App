import FormProvider from "../../react-hook-form/FormProvider";
import CustomTextField from "../../react-hook-form/CustomTextField";
import { Alert, Button , Link, Stack} from "@mui/material";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import CustomCodeField from "../../react-hook-form/CustomCodeField";
const VerifyOTPForm=()=> {
    const theme=useTheme();
    const verifyOTPSchema=Yup.object().shape({
        code1: Yup.string().required("Input is required"),
        code2: Yup.string().required("Input is required"),
        code3: Yup.string().required("Input is required"),
        code4: Yup.string().required("Input is required"),
        code5: Yup.string().required("Input is required"),
        code6: Yup.string().required("Input is required")
    })
    const defaultValues = {
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: "",
      };
    const methods=useForm({
        resolver: yupResolver(verifyOTPSchema),
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
            <Stack spacing={3}>
                {/* {!!errors.afterSubmit && (<Alert severity="error">{errors.afterSubmit.message}</Alert>)} */}
                <CustomCodeField
                keyName="code"
                inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
                />
                <Button sx={{
                    bgcolor: "text.primary",
                    color: (theme)=>
                    theme.palette.mode==="light"? "common.white":"grey.800",
                    "&:hover":{
                        bgcolor: "text.primary",
                        color: (theme)=>
                        theme.palette.mode==="light"? "common.white":"grey.800",
                    }
                }}>VERIFY</Button>
                
            </Stack>
        </FormProvider>
    </> );
}

export default VerifyOTPForm;