import { createTheme,ThemeProvider , StyledEngineProvider } from "@mui/material/styles";
import useSettings from "../hooks/useSettings";
import palette from "./pallete";
import { useMemo } from "react";
import { CssBaseline } from "@mui/material";

// ThemeProvider.propTypes = {
//     children: PropTypes.node,
//   };

export default function SetTheme({children}){
    const {themeMode} =useSettings()
    const isLight= themeMode==="light";
    const themeOptions=useMemo(()=>({
        palette: isLight? palette.light:palette.dark
    }),[isLight])
    const theme=createTheme(themeOptions);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

