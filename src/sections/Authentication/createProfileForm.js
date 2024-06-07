import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Avatar, Box, Stack , Alert, Button} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomTextField from '../../react-hook-form/CustomTextField'
import FormProvider from '../../react-hook-form/FormProvider'
import ProgressBarIntegration from '../../components/ProgressBar'
import { CreateProfile } from '../../redux/slices/auth'

export default function CreateProfileForm() {
    const {isLoading, email }=useSelector((state)=>state.auth)
    const dispatch=useDispatch()

    const createProfileSchema=Yup.object().shape({
        name: Yup.string()
        .required("Name is required")
        .min(3,"Should be minimum three characters long"),
        about: Yup.string()
        .required("about is required")
    })
    const defaultValues={
        name:"",
        about:""
    }
    const methods=useForm({
        resolver: yupResolver(createProfileSchema),
        defaultValues
    })
    const {
        reset,
        setError,
        handleSubmit,
        formState: {errors}
    } =methods

    const onSubmit= async(data)=>{
        try{
            const name=data.name
            const about=data.about
            dispatch(CreateProfile({name,about, image: selectedImage , email}))
        }
        catch(err){
            reset();
            setError("afterSubmit",{...err,message:err.message})
        }
    }
    const [selectedImage, setSelectedImage]=useState("")
    const [file, setfile]=useState("")

    const previewFile=(file)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend =()=>{
            setSelectedImage(reader.result)
        };
    }

    const handleChange=(e)=>{
        const file=e.target.files[0]
        setfile(file)
        previewFile(file)
    }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <Stack
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          flexDirection="column"
          
        >
        <input
          accept='image/*' 
          type="file"
          style={{display: "none"}}
          id="input-profile"
          onChange={handleChange}
        />
            <label htmlFor='input-profile'>
                <Avatar
                    sx={{ width: 120, height: 120, cursor: "pointer" }}
                    src={selectedImage}
                    alt="Selected Image"
                />
            </label>
        <CustomTextField name="name" label="name" />
        <CustomTextField name="about" label="about" />
    </Stack>
    </Stack>
    <Box sx={{ m: 1, position: "relative" }}>
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: isLoading ? "grey.400" : "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: isLoading ? "grey.400" : "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
            mt: 3,
          }}
        >
          {isLoading ? "Please wait..." : "Update"}
        </Button>
        {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
      </Box>
    </FormProvider>
  )
}
