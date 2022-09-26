import { createTheme, ThemeProvider } from "@mui/material";
const themes = createTheme({
  palette: {
    green: "#66B60F",
    onClickNavbarItemColor:
      "linear-gradient(90deg, #66B60F -1.37%, rgba(102, 182, 15, 0) 100%)",
    silver: "#A0A2A8",
  },
  typography: {
    fontFamily: ["Raleway", `sansSerif`].join(","),
  },
  shadows: Array(25).fill("none"),
});

export const ThemeProviderStyles = ({ children }) => {
    return (
        <ThemeProvider theme={themes}>
             {children}
        </ThemeProvider>
    )
}