import { useState } from "react";
import { Checkbox } from "@mantine/core";
import classes from "./SideBarCheckbox.module.css";

export default function SideBarCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      styles={{
        input: {
          backgroundColor: "rgba(39, 205, 18, 0)", // Checkbox background when checked
          borderColor: "rgb(160, 160, 160)"
        },
        icon: {
          color: "white", // Changes checkmark (✓) color
        },
      }}
      classNames={classes}
      label="Checkbox button"
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      wrapperProps={{
        onClick: () => setChecked((c) => !c),
      }}
    />
  );
}
