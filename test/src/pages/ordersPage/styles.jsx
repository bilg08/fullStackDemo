import { Grid, styled } from "@mui/material";

const drawerWidth = 240;

export const styles = {
  AllOrdersContainer: (theme) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    height: `auto`,
    p: 15,
    display: "flex",
    flexDirection: "column",
    background: "#F5F5F7",
    overflow: "scroll",
    flexWrap: "wrap",
    position: "relative",
    gap: `10px`,
    [theme.breakpoints.down("sm")]: {
      width: `100%`,
    },
  }),
  newOrdersContainer: (theme) => ({
    minWidth: `250px`,
    width: `auto`,
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
  }),
  shippedOrdersContainer: (theme) => ({
    minWidth: `250px`,
    width: `auto`,
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
  }),
};
export const AOrdersHeader = styled(Grid)(({ theme }) => ({
  width:`auto`,
  height: `auto`,
  background: `white`,
  display: 'flex',
  justifyContent: 'start',
}));

export const OrdersContainer = styled(Grid)(({ theme }) => ({
  maxWidth: `100%`,
  height: `auto`,
  display: "flex",
  flexFlow: "row",
  [theme.breakpoints.down("md")]: {
    flexFlow: "column",
  },
}));
export const NewOrder = styled(Grid)(({ theme }) => ({
  minWidth: `250px`,
  height: `auto`,
}));
export const ShippedOrder = styled(Grid)(({ theme }) => ({
  minWidth: `250px`,
  height: `auto`,
}));
