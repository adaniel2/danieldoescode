import classes from "./SideBar.module.css";
import React from "react";
import SideBarSlider from "./SideBarSlider";
import SideBarCheckbox from "./SideBarCheckbox";
import SideBarNumberInput from "./SideBarNumberInput";

export default function SideBar({ isHeaderVisible, setPointSize }) {

  return (
    <div
      className={classes.sidebarContainer}
      style={{
        top: isHeaderVisible ? "92px" : "36px",
        transition: "top 0.3s ease-in-out", // Smooth movement
      }}
    >
      <div className={classes.sidebarItems}>
        <SideBarSlider />
        <SideBarCheckbox />
        <SideBarCheckbox />
        <SideBarCheckbox />
        <SideBarNumberInput setPointSize={setPointSize}/>
      </div>
    </div>
  );
}
