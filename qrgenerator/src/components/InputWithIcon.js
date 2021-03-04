// React
import React from "react";
// Material UI
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function InputWithIcon({
  label,
  value,
  placeholder,
  position,
  icon,
  onChange,
  autoFocus = false,
  ...props
}) {
  return (
    <>
      <InputLabel htmlFor="input-with-icon-adornment">
        {label ? label : "Email"}
      </InputLabel>
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          icon && <InputAdornment position={position}>{icon}</InputAdornment>
        }
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder ? placeholder : "email@ejemplo.com"}
        autoFocus
        {...props}
      />
    </>
  );
}