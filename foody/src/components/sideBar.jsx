import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import logo from "../asset/Logo.png";
import { CardMedia } from "@mui/material";
import { useIsAdminLoggedContext } from "../context/isAdminLoggedContext";

const drawerWidth = 240;

export const Sidebar = (props) => {
  console.log(props,'p');
  const { window } = props;
  const handleDrawerOpen=props.handleDrawerOpen
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const whatPage = props.whatPage;
  const styles = {
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
  };

 

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <CardMedia
        sx={{ width: `120px`, margin: `auto` }}
        component="img"
        src={logo}
      />
      <List>
        {[
          {
            text: "Захиалга",
            pathName: `/OrdersPage`,
            icon: <ListAltIcon />,
          },
          {
            text: "График",
            pathName: `/Graphic`,
            icon: <SignalCellularAltIcon />,
          },
          {
            text: "Меню",
            pathName: `/Menu`,
            icon: <RestaurantMenuIcon />,
          },
        ].map((item, index) => (
          <Link
            style={{ textDecoration: "none" }}
            key={item.text}
            to={item.pathName}>
            <ListItem key={index} disablePadding>
              <ListItemButton sx={styles.button}>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}></AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={props.open}
          onClose={() => props.handleDrawerClose()}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              background: `#000723`,
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              background: `#000723`,
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  window: PropTypes.func,
};
