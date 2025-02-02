// ToggleHeaderButton.jsx
import React from "react";
import ReactDOM from "react-dom";
import { ActionIcon, Tooltip } from "@mantine/core";
import { PiArrowCircleDown, PiArrowCircleUp } from "react-icons/pi";

export default function ToggleHeaderButton({ isHeaderVisible, setHeaderVisible }) {
  return ReactDOM.createPortal(
    <Tooltip
      label={isHeaderVisible ? "Hide Header" : "Show Header"} // Tooltip text
      position="bottom"
      color="rgba(0, 0, 0, 0.22)"
      offset={12}
      openDelay={300} 
      closeDelay={100}
      withArrow
      zIndex="11000"// Smooth appearance
      transitionProps={{ transition: "slide-up", duration: 200 }}
    >
      <ActionIcon
        size="sm"
        radius="xl"
        onClick={() => setHeaderVisible(!isHeaderVisible)}
        style={{
          position: "fixed",
          top: `calc(${isHeaderVisible ? "61px" : "5px"})`,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 11000,
          backgroundColor: "rgba(74, 74, 74, 0.71)",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          transition: "top 0.3s ease-in-out",
        }}
      >
        {isHeaderVisible ? <PiArrowCircleUp size={24} /> : <PiArrowCircleDown size={24} />}
      </ActionIcon>
    </Tooltip>,
    document.getElementById("portal")
  );
}
