import { Box } from "@mui/material"
import { Header } from "../../components/header/header"
import { Movies } from "../../components/movies/movies"

export const HomePage=()=>{
    return(
        <Box sx={{ bgcolor: '#cfe8fc', height: 'auto' }} >
            <Header/>
            <Movies/>
        </Box>
    )
}