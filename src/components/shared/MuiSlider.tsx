import React, { useEffect } from "react";
import { FormLabel, Slider } from "@mui/material";
import { Controller, Control } from "react-hook-form";

type FormInputProps = {
  name: string;
  control: Control;
  setValue: (name: string, value: any) => void;
  label: string;
};

const MuiSlider = ({ name, control, setValue, label }: FormInputProps) => {
  const [sliderValue, setSliderValue] = React.useState<number>(30);

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue);
  }, [name, setValue, sliderValue]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <Slider
            value={sliderValue}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={1}
          />
        )}
      />
    </>
  );
};

export default MuiSlider;
