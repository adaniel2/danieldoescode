// Header.jsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import { Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { MantineLogo } from '@mantinex/mantine-logo';
import VoyisLogo from "../assets/voyis_logo.png";

import classes from "./Header.module.css";
import "@mantinex/mantine-logo/styles.css";


const links = [
  { link: "/gis", label: "GIS" },
  { link: "/3d-pcv", label: "3D Viewer" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  // const [active, setActive] = useState();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => { // listening for route changes that weren't via setActive
    setActive(location.pathname);
  }, [location.pathname]);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => setActive(link.link)} // Update active state on click
    >
      {link.label}
    </Link>
  ));

  // add to="/" Link tag to switch without reload
  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        {/* <VoyisLogo size={28} /> */}
        <Link to="/" onClick={() => setActive("/")}>
          <img
            src={VoyisLogo}
            alt="Voyis logo"
            style={{ height: 36, cursor: "pointer" }}
            // data-active={active === undefined}
            // onClick={() => (window.location.href = "/")}
          />
        </Link>

        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}

export default Header;
