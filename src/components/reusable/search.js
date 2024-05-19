import {styled} from '@mui/material/styles';
import { InputBase } from "@mui/material";
export const Search = styled("div") (({theme})=>({
    position: 'relative',
    borderRadius: 20,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginLeft:0,
    marginRight: theme.spacing(2),
    "&:focus": {
      outline: 'none',
      border: '#007bff',
      borderRadius: '1.5px',
      boxShadow: '0 0 10px rgba(0, 123, 255, 0.5)', /* Add box-shadow for 3D effect */
      transform: 'scale(1.02)', /* Add scale transform for additional depth */
    },
}));
    
export const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  
export  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      width: "100%",
    },
  }));

