import { green, orange, red, yellow } from "@mui/material/colors";
import {ThemeProvider,createTheme } from "@mui/material/styles"
export const Theme=createTheme({
    palette:{
        primary:yellow,
        secondary:red
    }
});
export const CustomTheme=({children})=>{
    return (
        <ThemeProvider theme={Theme}>
            {children}
        </ThemeProvider>
    )
}