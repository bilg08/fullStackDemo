import * as React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Button,
  styled
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setDocToFirebase } from "../firebaseForThisProject/setDoc";

import { useGetDatasFromArrayofDoc } from "../customHook/getDatasFromDocsArray";
import { useAgainGetDocs } from "../context/getDataAgainContext";
import { deleteDocOfFirebase } from "../firebaseForThisProject/deleteDoc";
export const OrderPage = () => {
  const newOrders = useGetDatasFromArrayofDoc("ThisDayOrders");
  const shippedOrders = useGetDatasFromArrayofDoc("shippedOrders");
  const packegedOrders = useGetDatasFromArrayofDoc("packegedOrders");
  const { againGetDocs, setAgainGetDocs } = useAgainGetDocs();
  const NewOrders = () => {
    const changeOrderTypeAsShipped = async (orderedDate, orderUid, orderData) => {
      await setDocToFirebase(
        `foodsOrders/${orderedDate}/shippedOrders/${orderUid}`,
        orderData
      ).then(()=>{setAgainGetDocs(prevVal=>!prevVal)});
      
    }

    const changeOrderTypeAsPackaged = async (
      orderedDate,
      orderUid,
      orderData
    ) => {
    const changedOrderData = {
      ...orderData,
      isShipped: true,
      isOrdered: false,
    };
     await deleteDocOfFirebase(
       `foodsOrders/${orderedDate}/ThisDayOrders/${orderUid}`
     );
      await setDocToFirebase(
        `foodsOrders/${orderedDate}/packegedOrders/${orderUid}`,
        changedOrderData
      );
      await setDocToFirebase(
        `foodsOrders/${orderedDate}/ThisDayOrders/${orderUid}`,
        changedOrderData
      ).then(() => {
        setAgainGetDocs((prevVal) => !prevVal);
      });
    };

    return (
      <Grid sx={styles.newOrdersContainer}>
        <AOrdersHeader>
          <h3>Захиалганууд</h3>
        </AOrdersHeader>
        <OrdersContainer>
          {newOrders.length <= 0
            ? undefined
            : newOrders.map((newOrder, index) => {
                return (
                  <NewOrder key={index}>
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}>
                      <p>{newOrder.date}</p>
                      <Badge badgeContent={newOrder.orders.length} color="primary">
                        <InventoryIcon />
                      </Badge>
                    </Grid>
                    {newOrder.orders.map((newOrderOrders, index) => {
                      
                      return (
                        <Accordion key={index}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography
                              sx={{
                                display: "flex",
                                width: `100%`,
                                justifyContent: `space-around`,
                              }}>
                              <p>{newOrderOrders.when}</p>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexFlow: "column",
                            }}>
                            <Typography
                              sx={{ display: "flex", alignItems: "center" }}>
                              <LocationOnIcon sx={{ color: "#66B60F" }} />
                              <p>{newOrderOrders.destination}</p>
                            </Typography>
                            <Typography
                              sx={{ display: "flex", alignItems: "center" }}>
                              <PhoneIcon sx={{ color: "#66B60F" }} />
                              <p>{newOrderOrders.phoneNumber}</p>
                            </Typography>
                            <Button
                              disabled={newOrderOrders.isOrdered}
                              onClick={() =>
                                changeOrderTypeAsShipped(
                                  newOrder.date,
                                  newOrderOrders.uid,
                                  newOrderOrders
                                )
                              }
                              sx={{
                                width: `108px`,
                                background: " #66B60F",
                                borderRadius: `10px`,
                                color: "white",
                                height: `32px`,
                              }}>
                              Хүргэгдсэн
                            </Button>
                            <Button
                              disabled={newOrderOrders.isShipped}
                              onClick={() => {
                                changeOrderTypeAsPackaged(
                                  newOrder.date,
                                  newOrderOrders.uid,
                                  newOrderOrders
                                );
                              }}
                              sx={{
                                display:
                                  newOrderOrders.isOrdered === true
                                    ? "none"
                                    : "block",
                                width: `108px`,
                                background: " #66B60F",
                                borderRadius: `10px`,
                                color: "white",
                                height: `32px`,
                              }}>
                              Савлагдсан
                            </Button>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </NewOrder>
                );
              })}
        </OrdersContainer>
      </Grid>
    );
  };

  const ShippedOrders = () => {
    return (
      <Grid sx={styles.shippedOrdersContainer}>
        <AOrdersHeader>
          <h3>Хүргэгдсэн захиалга</h3>
        </AOrdersHeader>
        <OrdersContainer>
          {shippedOrders.length <= 0 && shippedOrders.length===undefined
            ? undefined
            : shippedOrders.map((shippedOrder, index) => {
                return (
                  <NewOrder key={`shippedOrder${index}`}>
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <p>{shippedOrder.date}</p>
                      <Badge
                        badgeContent={
                          shippedOrder.orders.length === null
                            ? 0
                            : shippedOrder.orders.length
                        }
                        color="primary"
                      >
                        <InventoryIcon />
                      </Badge>
                    </Grid>
                    {shippedOrder.orders.map((shippedOrderOrders) => {
                      return (
                        <Accordion
                          key={`shippedOrderOrders${shippedOrderOrders}`}
                          sx={{
                            borderRadius: `10px`,
                            border: `1px solid #DFE0EB`,
                            borderRadius: `10px`,
                          }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography
                              sx={{
                                display: "flex",
                                width: `100%`,
                                justifyContent: `space-around`,
                              }}>
                              <p>{shippedOrderOrders.when}</p>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                                <Typography
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}>
                                  <LocationOnIcon sx={{ color: "#66B60F" }} />
                                  <p>{shippedOrderOrders.destination}</p>
                                </Typography>                           
                            <Typography
                              sx={{ display: "flex", alignItems: "center" }}>
                              <PhoneIcon sx={{ color: "#66B60F" }} />
                              <p>{shippedOrderOrders.phoneNumber}</p>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </NewOrder>
                );
              })}
        </OrdersContainer>
      </Grid>
    );
  };

  const PackagedOrders = () => {

    const changeOrderTypeAsShipped = async (orderedDate, orderUid, orderData) => {
      const changedOrderData = { ...orderData, isOrdered: true,isShipped:true }
    await deleteDocOfFirebase(
      `foodsOrders/${orderedDate}/packegedOrders/${orderUid}`
      )
      await deleteDocOfFirebase(
        `foodsOrders/${orderedDate}/ThisDayOrders/${orderUid}`,
      );
      await setDocToFirebase(
        `foodsOrders/${orderedDate}/ThisDayOrders/${orderUid}`,changedOrderData
      );
    await setDocToFirebase(
      `foodsOrders/${orderedDate}/shippedOrders/${orderUid}`,
      changedOrderData
    ).then(() => {
      setAgainGetDocs((prevVal) => !prevVal);
    });
  };
  return (
    <Grid sx={styles.shippedOrdersContainer}>
      <AOrdersHeader>
        <h3>Савлагдсан захиалга</h3>
      </AOrdersHeader>
      <OrdersContainer>
        {packegedOrders.length <= 0 && packegedOrders.length === undefined
          ? undefined
          : packegedOrders.map((packegedOrder, index) => {
              return (
                <NewOrder key={`packegedOrder${index}`}>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}>
                    <p>{packegedOrder.date}</p>
                    <Badge
                      badgeContent={
                        packegedOrder.orders.length === null||packegedOrder===undefined
                          ? 0
                          : packegedOrder.orders.length
                      }
                      color="primary">
                      <InventoryIcon />
                    </Badge>
                  </Grid>
                  {packegedOrder.orders.map((packegedOrderOrders) => {
                    console.log(packegedOrderOrders)
                    return (
                      <Accordion
                        key={`shippedOrderOrders${packegedOrderOrders}`}
                        sx={{
                          borderRadius: `10px`,
                          border: `1px solid #DFE0EB`,
                          borderRadius: `10px`,
                        }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header">
                          <Typography
                            sx={{
                              display: "flex",
                              width: `100%`,
                              justifyContent: `space-around`,
                            }}>
                            <p>{packegedOrderOrders.when}</p>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}>
                            <LocationOnIcon sx={{ color: "#66B60F" }} />
                            <p>{packegedOrderOrders.destination}</p>
                          </Typography>
                          <Typography
                            sx={{ display: "flex", alignItems: "center" }}>
                            <PhoneIcon sx={{ color: "#66B60F" }} />
                            <p>{packegedOrderOrders.phoneNumber}</p>
                          </Typography>
                          <Button
                            // disabled={newOrderOrders.isOrdered}
                            onClick={() =>
                              changeOrderTypeAsShipped(
                                packegedOrder.date,
                                packegedOrderOrders.uid,
                                packegedOrderOrders
                              )
                            }
                            sx={{
                              width: `108px`,
                              background: " #66B60F",
                              borderRadius: `10px`,
                              color: "white",
                              height: `32px`,
                            }}>
                            Хүргэгдсэн
                          </Button>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </NewOrder>
              );
            })}
      </OrdersContainer>
    </Grid>
  );
};

  
  return (
    <Grid container>
      <Grid item container sx={styles.AllOrdersContainer}>
        <NewOrders />
        <PackagedOrders />
        <ShippedOrders />
      </Grid>
    </Grid>
  );
};




const drawerWidth = 240;

export const styles = {
  AllOrdersContainer: (theme) => ({
    width: `100%`,
    height: `auto`,
    p: 10,
    display: "flex",
    flexDirection: "column",
    background: "#F5F5F7",
    overflow: "scroll",
    flexWrap: "wrap",
    position: "relative",
    gap: `10px`,
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
  width: `auto`,
  height: `auto`,
  background: `white`,
  display: "flex",
  justifyContent: "start",
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
