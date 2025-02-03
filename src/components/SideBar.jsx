import classes from "./SideBar.module.css";
import React from "react";

export default function SideBar({ isHeaderVisible }) {
  return (
    <div
      className={classes.sidebarContainer}
      style={{
        top: isHeaderVisible ? "92px" : "36px",
        transition: "top 0.3s ease-in-out", // Smooth movement
      }}
    ></div>
  );
}