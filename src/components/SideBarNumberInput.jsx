import { NumberInput } from '@mantine/core';
import classes from './SideBarNumberInput.module.css';

export default function SideBarNumberInput() {
  return (
    <>
      <NumberInput className={classes.numberInputField}
        size="xs"
        label="Step on hold"
        description="Step value when clicking and holding increment/decrement buttons"
        stepHoldDelay={200}
        stepHoldInterval={50}
        radius="md"
        pl={50}
        pr={50}
      />
    </>
  );
}