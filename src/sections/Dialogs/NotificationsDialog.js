import { Dialog, DialogContent, DialogTitle, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FriendRequestInfo from "../../components/friendRequestinfo";
import { FetchFriendsRequests } from "../../redux/slices/app";

const RequestList = () => {
  const dispatch = useDispatch();
  const { friendRequest } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchFriendsRequests());
  }, []);
 console.log("frined: "+friendRequest)
  return (
    <>
      {friendRequest.map((ele, idx) => {
        return <FriendRequestInfo key={idx} {...ele.sender} id={ele._id} />;
      })}
    </>
  );
};

export default function NotificationsDialog({ open, handleClose }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Dialog
        fullWidth
        keepMounted
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-description" sx={{ textAlign: "center" }}>
          Notifications
        </DialogTitle>
        <Stack p={2} sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Friend Requests" />
            <Tab label="Accepted Requests" />
          </Tabs>
        </Stack>
        <DialogContent>
          <Stack sx={{ height: "100%" }}>
            <Stack spacing={2.5}>
              {(() => {
                switch (value) {
                  case 0:
                    return <RequestList />;
                  case 1:
                    <></>;
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
  );
}
