import { Menu, MenuItem, Stack } from "@mui/material";
import { DotsThreeVertical } from "phosphor-react";
import { useState } from "react";
import { Message_options } from "../../../Data/data";

const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <DotsThreeVertical
        size={20}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el,idx) => (
            <MenuItem onClick={handleClose} key={idx}>{el.title}</MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export default MessageOptions;
