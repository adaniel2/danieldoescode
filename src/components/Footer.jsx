// Footer.jsx
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
import { ActionIcon, Container, Group } from "@mantine/core";
import classes from "./Footer.module.css";
import VoyisLogo from "../assets/voyis_logo.png";

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container size="lg" className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <div className={classes["img-wrapper"]}>
          <img src={VoyisLogo} alt="Voyis logo" className={classes.img} />
        </div>

        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://www.linkedin.com/in/dan13l/"
            target="_blank"
          >
            <IconBrandLinkedin size={24} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://github.com/adaniel2"
            target="_blank">
              <IconBrandGithub size={24} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default Footer;
