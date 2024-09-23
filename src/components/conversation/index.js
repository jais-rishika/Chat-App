import { Stack } from "@mui/material";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Message from "./Message";
const Conversation = () => {
  return (
    <Stack
      direction="column"
      sx={{ width: "100%", height: "100vh" }}
      justifyContent="space-between"
    >
      <Header />
      <Message sx={{ flexGrow: 1 }} />
      <Footer />
    </Stack>
  );
};

export default Conversation;
