import React from "react";
import { FormControl, Select } from "@material-ui/core";

const SelectBox = (props) => {
  return (
    <FormControl fullWidth={true}>
      <Select
        value={props.value}
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
