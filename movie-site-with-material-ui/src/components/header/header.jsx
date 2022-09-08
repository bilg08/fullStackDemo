import {AppBar,Badge,Toolbar,styled,Box, InputBase,Button,TextField} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { width } from "@mui/system";
export const Header=()=>{
    const StyledToolBar=styled(Toolbar)({
        display:"flex",
        justifyContent:"space-between"
    });
    const Search=styled('div')(({theme})=>({
        background:'white',
        height:60+'%',
        padding:"1px 100px",
        borderRadius:'10px'
    }))
    const Icons=styled('div')(({theme})=>({
        color:'white',
        display:"flex",
        justifyContent:"center",
        alignItems:'center'
    }));
    const StyledNavbarItems=styled(Box)(({them})=>({
        display:"flex",
        justifyContent:"space-between",
        alignItems:'center',
        gap:5+'%',
    }))
   
    return(
        <AppBar position="static">
           <StyledToolBar sx={{background:'black'}} >
             <StyledNavbarItems>
                <img style={{width:100+'px',heigth:100+'%'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"/>
                <Search><InputBase placeholder="Кино хайх..."/></Search>
             </StyledNavbarItems>

              <StyledNavbarItems sx={{display:'flex',justifyContent:'space-between'}}>
              <Icons>
                <Badge badgeContent={4} color='primary'>
                <ShoppingCartIcon/>
                </Badge>
              </Icons>
              <Button variant="contained">Нэвтрэх</Button>
              <Button variant="contained">Гарах</Button>
              </StyledNavbarItems>
           </StyledToolBar>
        </AppBar>
    )
}