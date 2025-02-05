import classes from "./SideBar.module.css";
import React from "react";
import SideBarSlider from "./SideBarSlider";
import SideBarCheckbox from "./SideBarCheckbox";
import SideBarNumberInput from "./SideBarNumberInput";
import SideBarTextInput from "./SideBarTextInput";

import { useUIContext } from "../context/UIContext";

export default function SideBar({ setPointSize }) {
  const { isHeaderVisible, activeViewer } = useUIContext();

  const SideBarComponents = {
    gis: (
      <>
        <SideBarTextInput />
      </>
    ),
    pcv: (
      <>
        <SideBarSlider />
        <SideBarCheckbox />
        <SideBarCheckbox />
        <SideBarCheckbox />
        <SideBarNumberInput setPointSize={setPointSize} />
      </>
    ),
  };

  return (
    <div
      className={classes.sidebarContainer}
      style={{
        top: isHeaderVisible ? "92px" : "36px",
        transition: "top 0.3s ease-in-out", // Smooth movement
      }}
    >
      <div className={classes.sidebarItems}>
        {SideBarComponents[activeViewer] || null}
      </div>
    </div>
  );
}
