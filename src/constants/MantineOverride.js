import { createTheme } from "@mantine/core";

export const actionIconTheme = createTheme({
  components: {
    ActionIcon: {
      styles: {
        root: {
          "--ai-hover": "rgb(250, 250, 250)",
          backgroundColor: "transparent",
          "&:hover": { backgroundColor: "var(--ai-hover)" }
        }
      }
    }
  }
});
