import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { Box } from "@mui/material";

export const Layout = () => {
  const [open, setOpen] = useState(true);
    const styles = {
      outletBox: (theme) => ({
        pl: open ? 30 : 30,
        [theme.breakpoints.down("sm")]: {
          pl: open ? 0 : 0,
        },
      }),
    };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
      <Box sx={styles.outletBox}>
        <Outlet />
      </Box>
    </>
  );
};

