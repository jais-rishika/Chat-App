import { useTheme } from '@emotion/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import ProgressBarIntegration from '../../components/ProgressBar'
import CustomTextField from '../../react-hook-form/CustomTextField'
import FormProvider from '../../react-hook-form/FormProvider'
import { DeleteUser } from '../../redux/slices/auth'



export default function DeleteAccount() {
    const dispatch=useDispatch()
    const {email}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const theme=useTheme()
    const newPasswordSchema=Yup.object().shape({
        password: Yup.string()
        .required("This is Required")
        .min(6,"Password should be of atleast 6 length"),
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

    const onSubmit = async (data) => {
                try {
                    const password = data.password;
                    console.log("email: "+email+"password: "+password)
                    dispatch(DeleteUser({ password, email }))
                } catch (error) {
                    // Handle the error
                    console.error(error);
                    reset();
                    setError("afterSubmit", { message: error.message });
                }
            };
  
    const [pass,setPass]=useState("")

    const[showPassword,setShowPassword]=useState(false)
    const [Dialogopen, setDialogOpen] = React.useState(false);

    const DialoghandleClickOpen = () => {
        setDialogOpen(true);
    };

    const DialoghandleClose = () => {
        setDialogOpen(false);
    };
    const {isLoading} =useSelector((state)=> state.auth)
  return (
    <Box p={4}
        sx={{
            position: 'relative',
            height: "100vh",
            width: 400,
            backgroundColor: 
            theme.palette.mode==='light'?  "#F8FAFF": theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.5)" 
            }}>
            <Stack direction="row" spacing={1} marginY={4}>
              <IconButton onClick={()=>{
                navigate("/profile")
              }}>
                <CaretLeft/>
              </IconButton>
              <Typography variant='h4'>Delete Account</Typography>
            </Stack>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                {!!errors.afterSubmit && (<Alert severity="error">{errors.afterSubmit.message}</Alert>)}
                <CustomTextField name="password" label="Password"
                    onChange={(e)=>{setPass(e.target.value)}}
                    type={showPassword? "text": "Password"}
                    InputProps={{
                        endAdornment:(
                          <InputAdornment>
                            <IconButton onClick={()=>setShowPassword(!showPassword)}>
                            </IconButton>
                          </InputAdornment>
                        )  
                    }}
                />
                <Typography variant='body1'>{pass}</Typography>
                <Button
                    onClick={DialoghandleClickOpen}
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
                    {isLoading ? "Please wait..." : "DELETE ACCOUNT "}
                    {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
                </Button>
                <Dialog
                    open={Dialogopen}
                    onClose={DialoghandleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Are you sure, you want to Delete your Account?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                            <Button onClick={()=>{
                                dispatch(DeleteUser({ password: pass, email }))
                                DialoghandleClose()
                            }}>
                            Yes
                            </Button>
                            <Button onClick={()=>{
                                DialoghandleClose()
                            }} autoFocus>
                            No
                            </Button>
                    </DialogActions> 
                      
                </Dialog>
                
                
            </Stack>
        </FormProvider>
    </Box>
  )
}
