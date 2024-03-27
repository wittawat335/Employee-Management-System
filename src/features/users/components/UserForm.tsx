import { useGetRolesQuery } from "@/features/roles/roleApi";
import { IAuth } from "@/types/Auth";
import { IUser } from "@/types/User";
import { Button, Stack } from "@mui/material";
import { useAddUserMutation, useUpdateUserMutation } from "../services/userApi";
import { Controller, useForm } from "react-hook-form";
import { UserSchema, UserValidation } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { ActiveItems } from "@/data/data";
import {
  MuiRadioGroup,
  MuiTextField,
  MultiSelectChip,
} from "@/components/shared";

type FormProps = {
  auth: IAuth | null;
  isAction: string;
  dataToEdit: IUser | undefined;
  onClose: () => void;
};

const UserForm = ({ auth, onClose, dataToEdit, isAction }: FormProps) => {
  const { data: roleList, isSuccess: roleSuccess } = useGetRolesQuery();
  const [addUser, { isSuccess: addUserSuccess }] = useAddUserMutation();
  const [updateUser, { isSuccess: updateSuccess }] = useUpdateUserMutation();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
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
      roles: isAction == "Edit" ? dataToEdit?.roles : [],
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
        <MuiTextField
          name={"email"}
          label={"E-mail"}
          control={control}
          isAction={isAction}
        />
        <MuiTextField
          name={"username"}
          label={"User Name"}
          control={control}
          isAction={isAction}
        />
        {isAction === "New" ? (
          <MuiTextField
            name={"password"}
            label={"Password"}
            control={control}
            isAction={isAction}
          />
        ) : null}
        <MuiTextField
          name={"phonenumber"}
          label={"Phone Number"}
          control={control}
          isAction={isAction}
        />
        <MuiTextField
          name={"fullname"}
          label={"Fullname"}
          control={control}
          isAction={isAction}
        />
        {roleSuccess ? (
          <Controller
            name="roles"
            control={control}
            rules={{ required: "Please fill out category !" }}
            render={({ field: { onChange, value } }) => (
              <MultiSelectChip
                onChange={onChange}
                value={value}
                chipList={roleList}
                label={"roles"}
                isAction={isAction}
              />
            )}
          />
        ) : null}
        <MuiRadioGroup
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
};

export default UserForm;
