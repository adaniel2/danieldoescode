import { TextInput } from "@mantine/core";
import { RiFilter2Line } from "react-icons/ri";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { useSideBarContext } from "../context/SideBarContext";

export default function SideBarTextInput() {
  const icon = <RiFilter2Line size={16} />;
  
  // Instead of directly using gisPointsFilter from context,
  // we use a local state variable to capture immediate user input.
  const [inputValue, setInputValue] = useState("");
  
  const { setGISPointsFilter } = useSideBarContext();

  // Create a debounced function to update the context.
  // This function will be stable across renders because we wrap it with useMemo.
  const debouncedSetFilter = useMemo(
    () =>
      debounce((value) => {
        setGISPointsFilter(value);
      }, 500),
    [setGISPointsFilter]
  );

  // Every time the local input value changes, call the debounced function.
  useEffect(() => {
    debouncedSetFilter(inputValue);

    // Cleanup: cancel any pending debounce calls if inputValue changes or component unmounts.
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [inputValue, debouncedSetFilter]);

  return (
    <TextInput
      mt="md"
      rightSectionPointerEvents="none"
      rightSection={icon}
      label="Filter points by tag or metadata"
      value={inputValue} // Controlled local state for the input
      onChange={(event) => setInputValue(event.currentTarget.value)}
      placeholder="Type to filter..."
    />
  );
}
