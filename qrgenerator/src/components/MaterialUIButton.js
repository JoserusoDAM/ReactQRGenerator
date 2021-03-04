import React from "react";
import Button from "@material-ui/core/Button";

export default function MaterialUIButton({
  variant,
  size,
  color,
  text,
  endIcon,
  startIcon,
  className,
  onClick,
  fullWidth,
}) {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      className={className}
      endIcon={endIcon && endIcon}
      startIcon={startIcon && startIcon}
      onClick={onClick}
      fullWidth={fullWidth}
    >
      {text}
    </Button>
  );
}