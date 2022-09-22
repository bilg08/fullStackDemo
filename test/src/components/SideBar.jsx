import { Drawer, IconButton, List,CardMedia } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import logo from '../asset/Logo.png'
const drawerWidth = 240;
export const Sidebar = ({ handleDrawerClose, open }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background:'#000723',
            color:'white',
            display:'flex',
            flexDirection:'column',
            justifyContent:'start',
            alignItems:'center',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <CardMedia
         sx={{ width: `120px`}}
         component='img'
         src={logo}
        />
        <List>
          {listItem.map(({ title, icon, href }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
              sx={styles.button}
                onClick={() => {
                  navigate(href);
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};





const listItem = [
  { title: "Хоолны цэс", href: "home", icon: <RestaurantMenuIcon sx={{color:'white'}}/> },
  { title: "График", href: "about", icon: <SignalCellularAltIcon sx={{color:'white'}}/> },
  { title: "Захиалга", href: "OrdersPage", icon: <ListAltIcon sx={{color:'white'}}/> },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const styles={
  DrawerTop: (theme) => ({
      width: `80%`,
      height: `auto`,
      border: `1px solid silver`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: "white",
      marginTop: "25%",
    }),
    button: (theme) => ({
      color: "white",
      "&:active": {
        background: theme.palette.onClickNavbarItemColor,
        transition: "0.3s",
      },
    }),
}