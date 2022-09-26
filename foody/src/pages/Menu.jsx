import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFoodsDatasContext } from "../context/foodsContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { deleteFileFromFirebaseStorage } from "../firebaseForThisProject/deleteFileFromStorage";
import {
  Card,
  CardContent,
  CardMedia,
  Fab,
  Grid,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { AddNewFood } from "../components/addNewFood";
import { deleteDocOfFirebase } from "../firebaseForThisProject/deleteDoc";
import Spinner from "../components/spinnerModal";
import { useSpinnerDatasContext } from "../context/spinnerContext";
import { useAgainGetDocs } from "../context/getDataAgainContext";

export const Menu = () => {
  const { foodsDatas } = useFoodsDatasContext(false);
  const {
    setIsSpinning,
  } = useSpinnerDatasContext();
  const {setAgainGetDocs}=useAgainGetDocs()
  const [isAddNewFoodFormOpen, setIsAddNewFoodFormOpen] = React.useState(false);
  
  const AddNewFoodBox = () => {
    return (
      <Grid item>
        <Card sx={styles.food}>
          <Fab sx={styles.addFoodLogo}>
            <RestaurantMenuIcon />
          </Fab>
          <CardContent sx={styles.foodAboutContainer}>
            <Typography sx={styles.AddNewFoodContainer} component="div">
              <Box sx={styles.addNewFoodMain}>
                <p style={{ fontSize: `18px` }}>Шинэ хоол нэмэх</p>
                <Fab
                  onClick={() => setIsAddNewFoodFormOpen(true)}
                  sx={styles.addFoodBtn}
                  size="medium">
                  <AddIcon />
                </Fab>
              </Box>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
  


const Food = (props) => {
  const food = props.value;
  if (food === undefined) {
    return null;
  } else {
    return (
      <Card sx={styles.food}>
        <CardMedia src={food.img} sx={styles.foodImg} component="img" />
        <CardContent sx={styles.foodAboutContainer}>
          <Typography sx={styles.FoodDetailsContainer} component="div">
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: `100%`,
                position: "relative",
                width: `90%`,
                flexDirection: "column",
                fontSize: `18px`,
              }}
            >
              <h2>{food.foodName}</h2>
              <p>{`Порц${food.foodPortion}`}</p>
              <Box
                sx={{
                  width: `100%`,
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h3>{food.foodPrice}₮</h3>
                <Fab
                  onClick={async () => {
                    setIsSpinning(true);
                    await deleteFileFromFirebaseStorage(
                      `foods/${food.foodName}`
                    );
                    deleteDocOfFirebase(`foods/${food.foodName}`).then(
                      async () => {
                        await setIsSpinning(false);
                        setAgainGetDocs(prevVal=>!prevVal)
                      }
                    );
                  }}
                  sx={styles.addFoodBtn}
                  size="medium"
                >
                  <RemoveIcon />
                </Fab>
              </Box>
            </Box>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};


  return (
    <Grid container>
      <Grid item justifyContent="center" sx={styles.FoodsContainer}>
        <AddNewFoodBox />
        <Spinner />
        {foodsDatas.map((food) => {
          return <Food key={food.foodName} value={food} />;
        })}
      </Grid>
      <AddNewFood value={{ isAddNewFoodFormOpen, setIsAddNewFoodFormOpen }} />
    </Grid>
  );
};





const drawerWidth = 240;

 const styles = {
  FoodsContainer: (theme) => ({
    width:`100%`,
    height: `auto`,
    p: 10,
    display: "flex",
    background: "#F5F5F7",
    flexWrap: "wrap",
    gap: `10px`,
  }),
  food: (theme) => ({
    color: "black",
    width: `250px`,
    minWidth: `250px`,
    height: `370px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    background: "transparent",
  }),
  addFoodBtn: (theme) => ({
    color: "white",
    background: theme.palette.green,
  }),
  addFoodLogo: (theme) => ({
    color: "#66B60F",
    width: `130px`,
    height: `130px`,
    borderRadius: `100%`,
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: `30`,
    background: `#F0F8E7`,
    border: `4px solid #66B60F`,
  }),
  foodImg: (theme) => ({
    color: "white",
    width: `130px`,
    height: `130px`,
    borderRadius: `100%`,
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: `30`,
  }),
  foodAboutContainer: (theme) => ({
    boxSizing: `borderBox`,
    position: `absolute`,
    width: `192px`,
    height: "260px",
    bottom: "0",
    borderRadius: `10px`,
    background: "white",
  }),
  FoodDetailsContainer: (theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: `0%`,
    fontSize: `18px`,
  }),
  AddNewFoodContainer: (theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    height: "80%",
    bottom: 0,
    left: `0%`,
  }),
  addNewFoodMain: (theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `100%`,
    position: "relative",
    flexDirection: "column",
  }),
};
