import React from "react";
import { FormControl, Select } from "@material-ui/core";

type Props = {
  children: React.ReactNode;
  fullWidth: true;
  value: string | boolean;
  variant: "filled" | "outlined" | "standard" | undefined;
  displayEmpty: boolean;
  onChange: (event: object) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
};

const SelectBox = (props: Partial<Props>) => {
  return (
    <FormControl fullWidth={props.fullWidth}>
      <Select
        value={props.value}
        variant={props.variant}
        displayEmpty={props.displayEmpty}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      >
        {props.children}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
