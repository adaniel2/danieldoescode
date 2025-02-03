// SettingsBurger.jsx
import { useState } from "react";
import { Menu, Button, Text } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";

import { IoTerminalOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

export default function SettingsBruger({
  setConsoleVisible,
  setSideBarVisible,
  activeLocation,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

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
            setSideBarVisible((prev) => {
              setIsSidebarOpen(!isSidebarOpen);
              return !prev;
            })
          }
        >
          {isSidebarOpen ? "Hide Settings" : "Show Settings"}
        </Menu.Item>
        <Menu.Item
          leftSection={<IoTerminalOutline size={16} />}
          onClick={() =>
            setConsoleVisible((prev) => {
              setIsConsoleOpen(!isConsoleOpen);
              return !prev;
            })
          }
        >
          {isConsoleOpen ? "Hide Log" : "Show Log"}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
