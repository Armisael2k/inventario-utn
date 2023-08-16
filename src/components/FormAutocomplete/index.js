import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import sleep from "@/utils/sleep";
import { Controller } from "react-hook-form";

function FormAutocomplete({ control, fieldName, label, api, options, onOptionsChange, onChange: onChangeCallback, isOptionEqualToValue, getOptionLabel, sx, ...props }) {
  const [open, setOpen] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setCurrentOptions([]);
    } else {
      if (options) {
        setCurrentOptions(options);
        return;
      }
      setLoading(true);
      (async () => {
        await sleep(500);
        const result = await api();
        setCurrentOptions(result);
        onOptionsChange?.(result);
        setLoading(false);
      })();
    }
  }, [open]);

  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue=""
      render={({ field: { ref, onChange, ...field }, fieldState }) => (
        <Autocomplete
          sx={{
            width: 250,
            ...sx
          }}
          {...props}
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          options={currentOptions}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          onChange={(_, data) => {
              onChange( getOptionLabel?.(data) || data );
              onChangeCallback?.(data);
            }
          }
          loading={loading}
          renderInput={params => (
            <TextField
              {...params}
              {...field}
              inputRef={ref}
              label={fieldState.error?.message || label}
              error={fieldState.invalid}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}

export default FormAutocomplete;