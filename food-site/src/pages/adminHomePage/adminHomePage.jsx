import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { CardMedia } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from "@mui/icons-material/Settings";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import logo from "../../asset/Logo.png";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {

    const styles = {
      DrawerTop: (theme) => ({
        width: `80%`,
        height: `30%`,
        border: `1px solid silver`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
        marginTop: "25%",
      }),
        button: (theme) => ({
        "&:active": {
          background: "linear-gradient(#5aff15,#00b712)",
          transition: "0.3s",
        },
      }),
    };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#000723",
            display: "flex",
            alignItems: "center",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={styles.DrawerTop}>
          <CardMedia sx={{ width: `120px` }} component="img" src={logo} />
          <List>
            {[
              { text: "Захиалга", icon: <ListAltIcon /> },
              { text: "График", icon: <SignalCellularAltIcon /> },
              { text: "Тохиргоо", icon: <SettingsIcon /> },
              { text: "Меню", icon: <RestaurantMenuIcon /> },
            ].map((item, index) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={styles.button}>
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}
