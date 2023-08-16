import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

function FormDatePicker({ control, fieldName, label, sx, ...props }) {
  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue=""
      render={({ field: { ref, ...field }, fieldState }) => (
        <DatePicker
          key={fieldName}
          {...field}
          sx={{
            maxWidth: 250,
            ...sx
          }}
          {...props}
          inputRef={ref}
          label={fieldState.error?.message || label}
          slotProps={{
            textField: {
              error: fieldState.invalid,
              placeholder: label,
            }
          }}
        />
      )}
    />
  );
}

export default FormDatePicker;