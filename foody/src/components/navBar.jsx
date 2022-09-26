import * as React from "react";

import {
  AppBar,
  Toolbar,
  styled,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Avatar,
  Menu,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetDocsFromFireBase } from "../customHook/getDocsCustomHook";
import { useAgainGetDocs } from "../context/getDataAgainContext";
import { useNavigate } from "react-router-dom";
import { useIsAdminLoggedContext } from "../context/isAdminLoggedContext";
const drawerWidth = 240;
export const Navbar = (props) => {
  console.log(props.handleDrawerOpen,'props')
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { signOutFromWebSite } = useIsAdminLoggedContext();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
const drawerWidth = 240;

  const StyledHeader = styled(Toolbar)(({ theme }) => ({
    background: "#FFFFFF",
    width: { sm: `calc(100% - ${drawerWidth}px)` },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    color: "black",
    [theme.breakpoints.down('sm')]: {
      width:`100%`
    }
  }));
  const HeaderSectionWithAvatarAndSearchNotification = styled(Box)(
    ({ theme }) => ({
      width: `13%`,
      height: `64px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    })
  );
  const HeaderSectionWithAvatar = styled(Box)(({ theme }) => ({
    border: "none",
    borderRight: `1px solid #DFE0EB`,
    width: `40%`,
    height: `64px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
  }));
  const styles = {
    menuButton: (theme) => ({
      color: "black",
      mr: 2,
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    }),
    NavbarContainer: (theme) => ({
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      [theme.breakpoints.down("sm")]: {
        width: `100%`,
      },
    }),
  };
  return (
    <AppBar position="fixed" sx={styles.NavbarContainer}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => {
            console.log('clicked')
            props.handleDrawerOpen();
          }}
          sx={{ mr: 2, display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Хоолондоо
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            <MenuItem key="Гарах" onClick={handleCloseUserMenu}>
              <Button
                onClick={async () => {
                  await signOutFromWebSite();
                  navigate('/')
                }}
                textAlign="center">
                Гарах
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
