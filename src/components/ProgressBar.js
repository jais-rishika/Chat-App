import { CircularProgress } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function ProgressBarIntegration({ isLoading }) {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "flex-start" }}>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            color: blue[500],
          }}
        />
      )}
    </div>
  );
}