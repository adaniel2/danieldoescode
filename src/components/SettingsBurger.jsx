import { ClassNames } from "@emotion/react";
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
import classes from "./SettingsBurger.module.css";

export default function SettingsBruger({ setConsoleVisible }) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button leftSection={<RxHamburgerMenu />} variant="default">
          Menu
        </Button>
      </Menu.Target>

      <Menu.Dropdown
        className={classes.burgerDropdown}
        style={{ zIndex: 9999, transform: "translateY(10%)" }}
      >
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={<IoTerminalOutline size={16} />}
          onClick={() => setConsoleVisible((prev) => !prev)}
        >
          Toggle Terminal
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
