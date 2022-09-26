import * as React from "react";
import { Card,Grid } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import { useGetDatasFromArrayofDoc } from "../customHook/getDatasFromDocsArray";
import { useGetDocsFromFireBase } from "../customHook/getDocsCustomHook";
import { useEffect } from "react";
import { useGetAllOrdersDetails } from "../customHook/getAllDatasForGraphic";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
  },
};


export const Graphic = () => {

  const allOrdersDetails = useGetAllOrdersDetails();
  const data = {

    labels: allOrdersDetails.ordersDateArray,
    datasets: [
      {
        label: "Захиалга өдөр өдрөөр",
        data: allOrdersDetails.ordersDataArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 1,
      },

    ],
  };



  return (
    <Grid container>
      <Grid item sx={styles.GraphicComponentContainer}>
        <Grid sx={styles.GraphicHeader}>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Нийт орлого</h2>
              <h1>{allOrdersDetails.totalProfit}₮</h1>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Захиалга</h2>
              <h1>{allOrdersDetails.ordersLength}</h1>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Хүргэсэн</h2>
              <h1>{allOrdersDetails.shippedOrderslength}</h1>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Буцаагдсан</h2>
              <h1>0</h1>
            </Card>
          </Grid>
        </Grid>
        <Grid item>
          <Bar options={options} data={data} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const drawerWidth = 240;
export const styles = {
  GraphicComponentContainer: (theme) => ({
    width: `100%`,
    height: `100%`,
    p: 10,
    display: "flex",
    background: "#F5F5F7",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: `10px`,
    [theme.breakpoints.down("sm")]: {
      width: `auto`,
      margin: "auto",
    },
  }),
  GraphicHeader: (theme) => ({
    width: `100%`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("md")]: {
      width: `auto`,
      margin: "auto",
      justifyContent: "center",
    },
  }),
  card: (theme) => ({
    width: `250px`,
    height: `135px`,
    background: `#FFFFFF`,
    border: `1px solid #DFE0EB`,
    borderRadius: `8px`,
  }),
};