import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from "react";
import { setDocToFirebase } from "../firebaseForThisProject/setDoc";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToFirebase } from "../firebaseForThisProject/storage";
import { useSpinnerDatasContext } from "../context/spinnerContext";
import { useAgainGetDocs } from "../context/getDataAgainContext";
import { Input, styled, TextField } from "@mui/material";

import { useRef } from "react";
import { useEffect } from "react";

export const AddNewFood = (props) => {
  const [foodImg, setFoodImg] = useState("");
  const { isSpinning, setIsSpinning } = useSpinnerDatasContext();
  const [isAddingData, setIsAddingData] = useState(false);
  const { setAgainGetDocs } = useAgainGetDocs();
  const { isAddNewFoodFormOpen, setIsAddNewFoodFormOpen } = props.value;
  const [formIsNotFilled,setFormIsNotFilled]=useState(false);

  const [foodform, setFoodform] = useState({
    foodName: "",
    foodDetail: "",
    foodPrice: "",
    foodPortion: "",
  });


  const [ImageUrl, setImageUrl] = useState("");



  const takeFoodDetail = (e) => {
    setFoodform({ ...foodform, [e.target.name]: e.target.value });
  };
  



  const formDetailsItems = [
    { type: "Хоолны нэр", inputName: "foodName" },
    { type: "Дэлгэрэнгүй", inputName: "foodDetail" },
    { type: "Үнэ", inputName: "foodPrice" },
    { type: "Порц", inputName: "foodPortion" },
  ];




  const takeUserOrder = async () => {
    if (ImageUrl!="",foodImg!="",foodform.foodDetail != "" && foodform.foodName != "" && foodform.foodPortion != "" && foodform.foodPortion!="") {
        setIsSpinning(true);
        setIsAddNewFoodFormOpen(false);
        await setDocToFirebase(`foods/${foodform.foodName}`, foodform).then(
          async () => {
            await uploadImageToFirebase(foodImg, foodform.foodName);
            await setIsSpinning(false);
            await setFoodform({
              foodName: "",
              foodDetail: "",
              foodPrice: "",
              foodPortion: "",
            });
            await setImageUrl("");
            setAgainGetDocs((prevVal) => !prevVal);
          }
        );
    } else {
      setFormIsNotFilled(true);
    }
  };








  function takeFoodImgUrlToShowImgInAddNewFoodImgSection(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function (event) {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
      setFoodImg((prevVal) => {
        let prevValACopy = prevVal;
        prevValACopy = e.target.files[0];
        return (prevVal = prevValACopy);
      });
  }







  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: isAddNewFoodFormOpen === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={true}>
      <Grid container sx={styles.addNewFoodContainer}>
        <Grid item sx={styles.AddNewFoodHeader}>
          <Button onClick={() => setIsAddNewFoodFormOpen(false)}>
            <CloseIcon />
          </Button>
          <Typography variant="h6">Хоол нэмэх</Typography>
          <Button onClick={takeUserOrder}>Хадгалах</Button>
        </Grid>
        <Grid item sx={styles.FoodFormContainer}>
          <Grid item sx={styles.FoodFormImageContainer}>
            <Box sx={styles.FoodFormImage}>
              <CardMedia
                sx={{ borderRadius: "100%" }}
                src={ImageUrl}
                component="img"
              />
              <label
                sx={{
                  border: `1px solid red`,
                  display: `inline-block`,
                  padding: `6px 12px`,
                  cursor: `pointer`,
                }}>
                <Input
                  sx={{ display: "none" }}
                  onChange={(e) =>
                    takeFoodImgUrlToShowImgInAddNewFoodImgSection(e)
                  }
                  type="file"
                />
                <CameraAltIcon sx={styles.CameraIcon} />
              </label>
            </Box>
          </Grid>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={formIsNotFilled}
            onClick={() => setFormIsNotFilled(false)}>
            <Alert severity="error">
              <AlertTitle>Мэдээлэл дутуу байна</AlertTitle>
            </Alert>
          </Backdrop>

          <Grid item sx={styles.FoodForm}>
            {formDetailsItems.map((formDetailsItem, index) => {
              return (
                <Box
                  key={`${formDetailsItem.type}+${index}`}
                  sx={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: `16px`, lineHeight: "24px" }}>
                    {formDetailsItem.type}
                  </label>
                  <StyledInput
                    value={foodform[formDetailsItem.inputName]}
                    placeholder="Энд бичнэ үү"
                    onChange={(e) => takeFoodDetail(e)}
                    name={formDetailsItem.inputName}
                  />
                </Box>
              );
            })}
          </Grid>

        </Grid>
      </Grid>
    </Backdrop>
  );
};










export const styles = {
  addNewFoodContainer: (theme) => ({
    width: `40%`,
    height: `95%`,
    background: "white",
    borderRadius: "10px",
    display: "flex",
    color: "black",
    [theme.breakpoints.down("sm")]: {
      width: `400px`,
      height:`400px`
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: `550px`,
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: `750px`,
    },
    [theme.breakpoints.up("lg")]: {
      width: `750px`,
      height:`650px`,
    },
  }),
  AddNewFoodHeader: (theme) => ({
    width: `100%`,
    height: `8%`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  FoodFormContainer: (theme) => ({
    width: `100%`,
    height: `40%`,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  }),
  FoodFormImageContainer: (theme) => ({
    width: `40%`,
    height: `auto`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  }),
  FoodFormImage: (theme) => ({
    width: `70%`,
    height: `70%`,
    borderRadius: `50%`,
    position: "relative",
    border: `1px solid #66B60F`,
  }),
  FoodForm: (theme) => ({
    width: `50%`,
    height: `auto`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
  }),
  FoodIngredients: (theme) => ({
    width: `100%`,
    height: `40%`,
    background: "red",
    display: "flex",
    alignItems: "center",
  }),
  FoodIngredientsAddingSection: (theme) => ({
    width: `50%`,
    height: `100%`,
    background: "green",
    display: "flex",
    alignItems: "center",
    flexFlow: "column",
  }),
  showFoodIngredientsAdminAdded: (theme) => ({
    width: `50%`,
    height: `100%`,
    background: "yellow",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: `2%`,
  }),
  CameraIcon: (theme) => ({
    padding: `5px`,
    position: "absolute",
    bottom: 0,
    right: 0,
    background: theme.palette.silver,
    borderRadius: `100%`,
    boxShadow: "0 0 0 6px white",
  }),
  styleForFormBottom: (theme) => ({
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  }),
};

export const StyledInput = styled(TextField)((theme) => ({
  background: `#FFFFFF`,
  borderRadius: `6px`,
  width: `100%`,
  outline: "none",
}));