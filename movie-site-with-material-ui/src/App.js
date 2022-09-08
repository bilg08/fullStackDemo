import styled from "@emotion/styled";
import { Box, Container, makeStyles, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/system";
import { HomePage } from "./pages/home/home";
import {CustomTheme} from "./context/themeProvider"

function App() {
 
  return (
    <CustomTheme>
      <Box sx={{background:'black'}}>
            <Container maxWidth="xl" >
              <HomePage/>
            </Container>
        </Box>
    </CustomTheme> 
  );
}

export default App;
