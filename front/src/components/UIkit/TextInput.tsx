import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  type: string;
  variant: "standard" | "filled" | "outlined" | undefined;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
};

const TextInput = (props: Partial<Props>) => {
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
