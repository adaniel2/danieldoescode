import { NumberInput } from '@mantine/core';
import classes from './SideBarNumberInput.module.css';

export default function SideBarNumberInput({setPointSize}) {
  return (
    <>
      <NumberInput className={classes.numberInputField}
        size="xs"
        label="Point Size"
        description=""
        stepHoldDelay={200}
        stepHoldInterval={50}
        radius="md"
        pl={50}
        pr={50}
        step={0.00001}
        defaultValue={0.0004}
        onChange={setPointSize}
        min={0.00001}
      />
    </>
  );
}