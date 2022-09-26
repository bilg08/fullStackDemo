import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSpinnerDatasContext } from "../context/spinnerContext";

export default function Spinner() {
    const {isSpinning}=useSpinnerDatasContext()
  
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isSpinning}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
