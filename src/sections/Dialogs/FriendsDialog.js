import { Dialog, DialogContent, Stack, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friendsinfo from '../../components/friendsinfo';
import { FetchFriends } from '../../redux/slices/app';

  const FriendsList=()=>{
    const dispatch=useDispatch()
    useEffect(() => {
      dispatch(FetchFriends());
    }, []);
  
    const {friends} = useSelector((state)=>state.app)
    return(
      <>
      {users?.map((user, idx) =>{
        return (
          <Friendsinfo 
            key={user._id}
            name={user.name}
            imageUrl={user.imageUrl}
            id={user._id}
          />
        )
      }
      )}
    </>
    )
  }
  export default function UsersDialog({open,handleClose}){
    const[value,setValue]=useState(0)
    const handleChange = (event, newValue)=>{
      setValue(newValue)
    }
  return (
    <>
    
      <Dialog
        fullWidth
        maxWidth="xs"
        keepMounted
        open={open}
        onClose={handleClose}
      >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Find Friends" />
          <Tab label="My Friends" />
        </Tabs>
      </Stack>
      <DialogContent>
      <Stack sx={{ height: "100%" }}>
            <Stack spacing={2.5}>
              {(() => {
                switch (value) {
                  case 0:
                    return <UserList/>
                  case 1:
                    return <FriendsList/>;
                    break;
                  default:
                    <></>;
                }
              })()}
            </Stack>
          </Stack>
      </DialogContent>
        
      </Dialog>
    </>
  )
}
