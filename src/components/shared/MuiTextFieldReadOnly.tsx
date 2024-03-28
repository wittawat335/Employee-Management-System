import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

type FormInputProps = {
  name: string;
  label: string;
  control: any;
};

const MuiTextFieldReadOnly = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          inputProps={{ readOnly: true }}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default MuiTextFieldReadOnly;
