import { useTheme } from '@emotion/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Fade, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import ProgressBarIntegration from '../../components/ProgressBar'
import CustomTextField from '../../react-hook-form/CustomTextField'
import FormProvider from '../../react-hook-form/FormProvider'
import { EditProfile, logOutUser } from '../../redux/slices/auth'

export default function CreateProfileForm() {
    const {isLoading, email, profileImageUrl, name, about}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const theme=useTheme()
    const navigate=useNavigate()
    const createProfileSchema=Yup.object().shape({
        name: Yup.string()
        .required("Name is required")
        .min(3,"Should be minimum three characters long"),
        about: Yup.string()
        .required("about is required")
    })
    const defaultValues={
        name:name ||"",
        about:about||""
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
            console.log("EDIT PROFILE"+data)
            const name=data.name
            const about=data.about
            dispatch(EditProfile({name,about, image: selectedImage , email:email}))
        }
        catch(err){
            reset();
            setError("afterSubmit",{...err,message:err.message})
        }
    }
    const [selectedImage, setSelectedImage]=useState(profileImageUrl)
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
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const [Dialogopen, setDialogOpen] = React.useState(false);

    const DialoghandleClickOpen = () => {
        setDialogOpen(true);
    };

    const DialoghandleClose = () => {
        setDialogOpen(false);
    };
    
  return (
    <Box
    {...console.log(name +"name:  "+ about + "about:  " )}
        sx={{
            position: 'relative',
            height: "100vh",
            width: 300,
            backgroundColor: 
            theme.palette.mode==='light'?  "#F8FAFF": theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.5)" 
            }}>
            <Stack direction="row" spacing={1} mt={3}>
              <IconButton onClick={()=>{
                navigate("/app")
              }}>
                <CaretLeft/>
              </IconButton>
              <Typography variant='h4'>Profile</Typography>
            </Stack>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} p={5}>
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
            <label>
                <Avatar
                    sx={{ width: 120, height: 120, cursor: "pointer" }}
                    src={selectedImage}
                    alt="Selected Image"
                    key={selectedImage}
                    onClick={handleClick}
                />
            </label>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}

              anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
        
      >
        <MenuItem onClick={() => {
        const fileInput = document.getElementById('input-profile');
        fileInput.click();
        handleClose()
      }}>Update Profile</MenuItem>
      {selectedImage && 
        <MenuItem onClick={()=>{
          setSelectedImage("https://res.cloudinary.com/ddncw4pqb/image/upload/v1717325773/samples/profile/profile_gvqm00.jpg")
          handleClose()
        } }
        >Remove Profile</MenuItem>}
      </Menu>
        <input
          accept='image/*' 
          type="file"
          style={{display: "none"}}
          id="input-profile"
          onChange={handleChange}
        />
        <CustomTextField name="name" label="name" values={name}/>
        <CustomTextField name="about" label="about" multiline  maxRows={5} values={about}/>
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
          {isLoading ? "Please wait..." : "Save"}
          {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
        </Button>
      </Box>
    </FormProvider>
    <Stack direction="row" spacing={4} p={2} flexGrow={1}>
        <Button color="inherit"    
          variant="contained"
          size='medium'
          sx={{
            width: "28%",
            height: "20%",
            fontStyle: "bold",
            border: theme.palette.mode === "light" ?"3px solid ":"3px solid white",

            color: (theme) =>
              theme.palette.mode === "light" ? "common.black" : "common.white",
            "&:hover": {
              bgcolor: "text.secondary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.black" : "grey.800",
            },
            mt: 3,
          }}
          onClick={DialoghandleClickOpen}>LogOut</Button>

        <Dialog
          open={Dialogopen}
          onClose={DialoghandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{
              dispatch(logOutUser({email}))
              DialoghandleClose()}}>
              Yes
            </Button>
            <Button onClick={DialoghandleClose} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>

        <Button color="inherit"
          
          variant="contained"
          size='medium'
          sx={{
            width: "60%",
            height: "20%",
            fontStyle: "bold",
            border: theme.palette.mode === "light" ?"3px solid ":"3px solid white",

            color: (theme) =>
              theme.palette.mode === "light" ? "common.black" : "common.white",
            "&:hover": {
              bgcolor: "text.secondary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.black" : "grey.800",
            },
            mt: 3,
          }}
          onClick={()=>{
            navigate("/delete-account")
          }}
          > Delete Account</Button>
    </Stack>
    </Box>
  )
}
