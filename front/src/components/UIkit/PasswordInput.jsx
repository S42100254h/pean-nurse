import React, { useState } from "react";
import { Visibility } from "@material-ui/icons";
import { VisibilityOff } from "@material-ui/icons";
import { InputAdornment } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const PasswordInput = (props) => {
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
