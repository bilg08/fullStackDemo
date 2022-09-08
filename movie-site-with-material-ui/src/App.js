import styled from "@emotion/styled";
import { Box, Container, makeStyles } from "@mui/material";
import { HomePage } from "./pages/home/home";

function App() {
 
  return (
      <Box sx={{background:'red'}}>
        <Container maxWidth="xl" >
          <HomePage/>
        </Container>
      </Box>
  );
}

export default App;
