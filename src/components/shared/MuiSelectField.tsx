import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

type FormInputProps = {
  name: string;
  label: string;
  control: any;
  isAction: string;
  options: any[] | undefined;
  optionLabel: string;
};

const MuiSelectField = ({
  name,
  label,
  control,
  isAction,
  options,
  optionLabel,
}: FormInputProps) => {
  const generateSingleOptions = () => {
    return options?.map((option: any) => {
      return (
        <MenuItem key={option[name]} value={option[name]}>
          {option[optionLabel]}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            onChange={onChange}
            value={value}
            inputProps={{ readOnly: isAction == "View" ? true : false }}
            error={!!error}
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};

export default MuiSelectField;
