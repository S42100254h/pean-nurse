import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInput = (props) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      variant={props.variant}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default TextInput;
