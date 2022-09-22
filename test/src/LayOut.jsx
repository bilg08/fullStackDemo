import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { Box } from "@mui/material";

export const Layout = () => {
  const [open, setOpen] = useState(true);

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
      <Box sx={{ pt: 10, pl: open ? 35 : 10 }}>
        <Outlet />
      </Box>
    </>
  );
};