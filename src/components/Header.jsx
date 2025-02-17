// Header.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useBasePath } from "../context/BasePathContext";

import SettingsBurger from "./SettingsBurger";
import VoyisLogo from "../assets/voyis_logo.png";

import classes from "./Header.module.css";
import "@mantinex/mantine-logo/styles.css";

import { useUIContext } from "../context/UIContext";

export function Header() {
  const { isHeaderVisible, isViewerActive } = useUIContext();

  const [opened, { toggle }] = useDisclosure(false);
  const location = useLocation();
  const projectRoot = useBasePath();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    // listening for route changes that weren't via setActive
    setActive(location.pathname);
  }, [location.pathname]);

  // Adjust links to be relative to project root
  const links = [
    { link: `${projectRoot}/gis`, label: "GIS" },
    { link: `${projectRoot}/3d-pcv`, label: "3D Viewer" },
  ];

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
    <header
      className={`${classes.header} ${!isHeaderVisible ? classes.hidden : ""}`}
    >
      <Container size="lg" className={classes.inner}>
        {/* <VoyisLogo size={28} /> */}
        <Link to={projectRoot} onClick={() => setActive(projectRoot)}>
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

        {isViewerActive && (
          <div>
            <SettingsBurger
              opened={opened}
              onClick={toggle}
              size="sm"
            />
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
