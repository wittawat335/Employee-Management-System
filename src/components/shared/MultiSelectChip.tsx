import { useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Controller } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  roleName: readonly string[] | undefined,
  theme: Theme
) {
  return {
    fontWeight:
      roleName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type MultipleSelectChipProps = {
  //name: string;
  //control: any;
  value: string[] | undefined;
  isAction: string;
  chipList: any[] | undefined;
  label: string;
  onChange: (selectedChips: string[]) => void;
};

const MultiSelectChip = ({
  //name,
  //control,
  value,
  isAction,
  chipList,
  label,
  onChange,
}: MultipleSelectChipProps) => {
  const theme = useTheme();
  const [chipName, setChipName] = useState<string[] | undefined>(
    isAction == "Edit" ? value : []
  );

  const handleChange = (event: SelectChangeEvent<typeof chipName>) => {
    const {
      target: { value },
    } = event;
    const name = typeof value === "string" ? value.split(",") : value;
    setChipName(name as string[]);
    onChange(name as string[]);
    // On autofill we get a stringified value.
  };

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={chipName}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: any) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {chipList?.map((item: any) => (
          <MenuItem
            key={item.id}
            value={item.name}
            style={getStyles(item.name, chipName, theme)}
          >
            {item.name}
            {chipName?.includes(item.name) ? <CheckIcon color="info" /> : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectChip;
