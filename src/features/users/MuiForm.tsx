import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserValidation } from "@/lib/validation/schema";
import { useGetRolesQuery } from "../roles/roleApi";
import { useAddUserMutation, useUpdateUserMutation } from "./services/userApi";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { IUser } from "@/types/User";
import CheckIcon from "@mui/icons-material/Check";
import { FormInputRadio, FormInputText } from "@/components/shared/form";
import { ActiveItems } from "@/data/data";

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

interface FormProps {
  isAction: string;
  dataToEdit: IUser | undefined;
  onClose: () => void;
}

export default function UserForm({ onClose, dataToEdit, isAction }: FormProps) {
  const theme = useTheme();
  const { data: roles, isSuccess: roleSuccess } = useGetRolesQuery();
  const [addUser, { isSuccess: addUserSuccess }] = useAddUserMutation();
  const [updateUser, { isSuccess: updateSuccess }] = useUpdateUserMutation();
  const [selectedRoles, setSelectedRoles] = useState<string[] | undefined>(
    isAction != "New" ? dataToEdit?.roles : []
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserSchema>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      id: dataToEdit?.id ? dataToEdit.id : "",
      password: "xxxxx",
      email: dataToEdit?.email ? dataToEdit.email : "",
      username: dataToEdit?.username ? dataToEdit.username : "",
      fullname: dataToEdit?.fullname ? dataToEdit.fullname : "",
      phonenumber: dataToEdit?.phonenumber
        ? dataToEdit?.phonenumber
        : "093xxxxxxx",
      active: dataToEdit?.active ? dataToEdit?.active : "1",
    },
  });

  const submit = async (request: UserSchema) => {
    try {
      isAction == "New" ? await addUser(request) : await updateUser(request);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedRoles>) => {
    const {
      target: { value },
    } = event;
    setSelectedRoles(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (addUserSuccess) {
      toast.success(messages.add_success);
      onClose();
    }
  }, [addUserSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success(messages.update_success);
      onClose();
    }
  }, [updateSuccess]);

  const isOnSubmit = useCallback((values: UserSchema) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

  return (
    <form onSubmit={handleSubmit(isOnSubmit)}>
      <Stack spacing={2} margin={2}>
        <FormInputText
          name={"email"}
          label={"E-mail"}
          control={control}
          isAction={isAction}
        />
        <FormInputText
          name={"username"}
          label={"User Name"}
          control={control}
          isAction={isAction}
        />

        {isAction === "New" ? (
          <FormInputText
            name={"password"}
            label={"Password"}
            control={control}
            isAction={isAction}
          />
        ) : null}

        <FormInputText
          name={"phonenumber"}
          label={"Phone Number"}
          control={control}
          isAction={isAction}
        />

        <FormInputText
          name={"fullname"}
          label={"Fullname"}
          control={control}
          isAction={isAction}
        />

        {/* Roles DDl */}
        <FormControl>
          <InputLabel>Role</InputLabel>
          <Select
            {...register("roles", { required: "roles is required" })}
            multiple
            value={selectedRoles}
            onChange={handleChange}
            input={<OutlinedInput label="Chip" />}
            inputProps={{ readOnly: isAction == "View" ? true : false }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {roleSuccess
              ? roles?.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.name}
                    style={getStyles(item.name, selectedRoles, theme)}
                  >
                    {item.name}
                    {selectedRoles?.includes(item.name) ? (
                      <CheckIcon color="info" />
                    ) : null}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>

        <FormInputRadio
          label={"Active"}
          name="active"
          options={ActiveItems}
          control={control}
        />
        {isAction != "View" ? (
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        ) : null}
      </Stack>
    </form>
  );
}
