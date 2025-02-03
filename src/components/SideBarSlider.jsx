// SideBarSlider.jsx
import { useState } from "react";
import { Slider, Text, Box } from "@mantine/core";

export default function SideBarSlider() {
  const [value, setValue] = useState(50);
  const [endValue, setEndValue] = useState(50);

  return (
    <Box maw={400} mx="auto">
      <Slider
        value={value}
        onChange={setValue}
        onChangeEnd={setEndValue}
      />
      <Text mt="md" size="sm">
        onChange value: <b>{value}</b>
      </Text>
      <Text mt={5} size="sm">
        onChangeEnd value: <b>{endValue}</b>
      </Text>
    </Box>
  );
}
