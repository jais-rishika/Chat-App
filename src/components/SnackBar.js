import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";

export default function SnackBarIntegration({
  open,
  severity,
  message,
  CloseSnackBar,
}) {
  const dispatch = useDispatch();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={() => {
        dispatch(CloseSnackBar());
      }}
      autoHideDuration={5000}
    >
      <Alert
        severity={severity}
        onClose={() => {
          dispatch(CloseSnackBar());
        }}
        sx={{ width: "100%" }}
      >
        {Object.keys(message).map((key, index) => (
          <div key={index}>
            {key}: {message[key]}
          </div>
        ))}
      </Alert>
    </Snackbar>
  );
}