import React from "react";
import { TextField } from "@mui/material";
import { useFormContext, Controller, Control } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

// interface FormInputProps {
//   name: string;
//   control: any;
//   label: string;
// }

// const FormInputDate = ({ name, control, label }: FormInputProps) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field: { onChange, value } }) => (
//           <DatePicker label={label} value={value} onChange={onChange} />
//         )}
//       />
//     </LocalizationProvider>
//   );
// };

// export default FormInputDate;

type IFormElementTypes = {
  name: string;
  label: string;
  control: any;
  required?: boolean;
  defaultValue?: string;
  isReadonly: boolean;
};

const MuiDatePicker = ({
  name,
  label,
  control,
  defaultValue,
  isReadonly,
}: IFormElementTypes) => {
  //const [value, setValue] = React.useState<string | null>(null);
  //const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <DatePicker
            {...field}
            label={label}
            format="DD/MM/YYYY"
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  error={!!errors[name]}
                  fullWidth
                  helperText={String(errors[name]?.message ?? "")}
                  {...register(name)}
                />
              ),
            }}
            value={value}
            onChange={(newvalue) => {
              setValue(newvalue);
            }}
          /> */}
          <DatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={onChange}
            format="YYYY-MM-DD"
            views={["year", "month", "day"]}
            slots={{
              textField: (params) => (
                <TextField variant="outlined" {...params} />
              ),
            }}
            readOnly={isReadonly ? true : false}
          />
        </LocalizationProvider>
      )}
    />
  );
};
export default MuiDatePicker;
