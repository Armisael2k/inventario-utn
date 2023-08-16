import { Controller } from "react-hook-form";
import { forwardRef } from "react";
import {
  TextField,
  InputAdornment
} from "@mui/material";

function FormTextField({ control, fieldName, label, shrink, maxLength, step, startAdornment, endAdornment, defaultValue, sx, ...props }, ref) {
  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue={defaultValue || ""}
      render={({ field: { ref, ...field }, fieldState }) => (
        <TextField
          key={fieldName}
          sx={{
            width: 250,
            ...sx
          }}
          inputRef={ref}
          label={fieldState.error?.message || label}
          error={fieldState.invalid}
          InputLabelProps={{ shrink: shrink === false ? undefined : true }}
          InputProps={{
            startAdornment: startAdornment ? (
              <InputAdornment position="start">
                { startAdornment }
              </InputAdornment>
            ) : null,
            endAdornment: endAdornment ? (
              <InputAdornment position="start">
                { endAdornment }
              </InputAdornment>
            ) : null,
          }}
          {...field}
          {...props}
          inputProps={{
            maxLength: maxLength || 255,
            step: step,
          }}
        />
      )}
    />
  );
}

export default forwardRef(FormTextField);