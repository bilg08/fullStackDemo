import React from "react";
import "./searchDevelopers-input.css";

export const SearchDevelopers = (props) => {
    return(
        <input
        placeholder="Хайх"
        className="searchDevelopers-input"
        onChange={props.onSearch}
        />
    )
}