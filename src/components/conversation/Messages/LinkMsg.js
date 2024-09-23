import { useTheme } from '@emotion/react';
import { Box, Link, Stack, Typography, alpha } from "@mui/material";
import React from 'react';
import MessageOptions from './messageTypes';

const LinkMsg = ({ele}) => {
    const theme = useTheme();
  <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
    <Box
      p={1.5}
      sx={{
        backgroundColor: ele.incoming
          ? alpha(theme.palette.background.default, 1)
          : theme.palette.primary.main ,
        borderRadius: 1.5,
        width: "max-content",
      }}
    >
      <Stack spacing={2}>
        <Stack
          p={2}
          spacing={3}
          alignItems={"start"}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          <img
            src={ele.preview}
            alt={ele.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Stack spacing={2}>
            <Typography variant="subtitle2">Github Link</Typography>
            <Typography
              variant="subtitle2"
              component={Link}
              style={{ color: theme.palette.primary.main }}
            >
              www.github.com
            </Typography>
          </Stack>
          <Typography
            variant="subtile2"
            color={ele.incoming ? theme.palette.text : "#fff"}
          >
            {ele.message}
          </Typography>
        </Stack>
      </Stack>
    </Box>
    <MessageOptions/>
  </Stack>
}
export default LinkMsg;
