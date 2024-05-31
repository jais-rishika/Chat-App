import { CircularProgress } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function ProgressBarIntegration({ isLoading }) {
  return (
    isLoading && (
      <CircularProgress
        size={24}
        sx={{
          color: blue[500],
          position: "absolute",
          top: "62%",
          left: "50%",
        }}
      />
    )
  );
}