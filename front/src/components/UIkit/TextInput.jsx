import React from "react";
import TextField from "@material-ui/core";
import { getThemeProps } from "@material-ui/styles";

const TextInput = () => {
  return (
    <TextField
      fullWidth={getThemeProps.fullWidth}
      label={getThemeProps.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  );
};

export default TextField;
