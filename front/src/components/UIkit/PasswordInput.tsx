import React, { useState } from "react";
import { Visibility } from "@material-ui/icons";
import { VisibilityOff } from "@material-ui/icons";
import { InputAdornment } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

type Props = {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  variant: "filled" | "outlined" | "standard" | undefined;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
};

const PasswordInput = (props: Partial<Props>) => {
  const [showPassword, setShowPassword] = useState(false);  

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={showPassword ? "text" : "password"}
      variant={props.variant}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              tabIndex="-1"
              onClick={() => handleShowPasswordToggle()}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
      }}
    />
  );
};

export default PasswordInput;
