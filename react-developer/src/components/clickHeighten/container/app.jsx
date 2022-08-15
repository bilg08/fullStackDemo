import React from "react";
import "./style.css";
import { Cart } from "../cart/app";
import datas from "../data.json";
import { HeigthContextProvider } from "../context/app";


export const CartsContainer = () => {
    return (
        <HeigthContextProvider>
            <div className="Container">
                <Cart developers={datas}/>
            </div>
        </HeigthContextProvider>
    )
}