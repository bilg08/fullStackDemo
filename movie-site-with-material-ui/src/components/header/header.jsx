import {AppBar,Badge,Toolbar,styled,Box, InputBase,Button,TextField} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRef,useEffect } from "react";
export const Header=()=>{
    const videoEl = useRef(null);

    const attemptPlay = () => {
      videoEl &&
        videoEl.current &&
        videoEl.current.play().catch((error) => {
          console.error("Error attempting to play", error);
        });
    };
  
    useEffect(() => {
      attemptPlay();
    }, []);
    const StyledToolBar=styled(Toolbar)({
        display:"flex",
        justifyContent:"space-between",
        background:'black',
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
    const BoxHeaderWithVideo=styled(Box)(({them})=>({
        width:100+'%',
        height:70+'%',
        backgroundPosition:'center',
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        position:'relative',
    }));
    const StyledBoxHeaderShadow=styled(Box)(({them})=>({
        position:'absolute',
        width:60+'%',
        height:100+'%',
        background:'linear-gradient(90deg,#181818 10%,hsla(0,0%,9%,.98) 20%,hsla(0,0%,9%,.97) 25%,hsla(0,0%,9%,.95) 35%,hsla(0,0%,9%,.94) 40%,hsla(0,0%,9%,.92) 45%,hsla(0,0%,9%,.9) 50%,hsla(0,0%,9%,.87) 55%,hsla(0,0%,9%,.82) 60%,hsla(0,0%,9%,.75) 65%,hsla(0,0%,9%,.63) 70%,hsla(0,0%,9%,.45) 75%,hsla(0,0%,9%,.27) 80%,hsla(0,0%,9%,.15) 85%,hsla(0,0%,9%,.08) 90%,hsla(0,0%,9%,.03) 95%,hsla(0,0%,9%,0));',
        top:0,
        left:0,
        color:'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    }));
    return(
        <BoxHeaderWithVideo>
            <video ref={videoEl} autoPlay={true}  muted loop style={{position:'relative',width:100+'%'}}>
                <source src="https://website-static.plex.tv/videos/movies_and_tv_hero_background.mp4" type="video/mp4"/>
            </video>
            <AppBar position="absolute" sx={{width:100+'%',heigth:50+'%',marginTop:10+'px'}}>

            <StyledToolBar >
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
        <StyledBoxHeaderShadow>
            <h1>Та Кино үзмээр байна уу?</h1>
            <p>Lorem ipsum dolor sit amet consecem nemo modi libero dolorum aspernatur. Beatae similique natus doloribus iste!</p>
            <Button color="primary" variant="contained">Нэвтрэх</Button>
        </StyledBoxHeaderShadow>
   </BoxHeaderWithVideo>
    )
}