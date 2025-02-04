// SettingsBurger.jsx
import { useState } from "react";
import { Menu, Button, Text } from "@mantine/core";
import {
  IconSettings,
} from "@tabler/icons-react";

import { IoTerminalOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import { useUIContext } from "../context/UIContext";

export default function SettingsBruger({ activeLocation }) {
  const {
    isSideBarVisible,
    isConsoleVisible,
    setConsoleVisible,
    setSideBarVisible,
  } = useUIContext();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button leftSection={<RxHamburgerMenu />} variant="default">
          Menu
        </Button>
      </Menu.Target>

      <Menu.Dropdown
        style={{
          zIndex: 9999,
          transform: "translateY(10%)",
          transition: "0ms",
        }}
      >
        <Menu.Label>Visualizer</Menu.Label>
        <Menu.Item
          leftSection={<IconSettings size={16} />}
          onClick={() =>
            setSideBarVisible((prev) => !prev)
          }
        >
          {isSideBarVisible ? "Hide Settings" : "Show Settings"}
        </Menu.Item>
        <Menu.Item
          leftSection={<IoTerminalOutline size={16} />}
          onClick={() =>
            setConsoleVisible((prev) => !prev)
          }
        >
          {isConsoleVisible ? "Hide Log" : "Show Log"}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
