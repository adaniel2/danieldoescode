// ToggleHeaderButton.jsx
import React from "react";
import ReactDOM from "react-dom";
import { ActionIcon } from "@mantine/core";
import { PiArrowCircleDown, PiArrowCircleUp } from "react-icons/pi";

export default function ToggleHeaderButton({ isHeaderVisible, setHeaderVisible }) {
  return ReactDOM.createPortal(
    <ActionIcon
      size="sm"
      radius="xl"
      onClick={() => setHeaderVisible(!isHeaderVisible)}
      style={{
        position: "fixed",
        top: `calc(${isHeaderVisible ? "45px" : "5px"})`,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 11000, // Should be above header (9999)
        backgroundColor: "rgba(74, 74, 74, 0.71)",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        transition: "top 0.3s ease-in-out",
      }}
    >
      {isHeaderVisible ? (
        <PiArrowCircleUp size={24} />
      ) : (
        <PiArrowCircleDown size={24} />
      )}
    </ActionIcon>,
    document.getElementById("portal")
  );
}
