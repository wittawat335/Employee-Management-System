import { useGetRolesQuery } from "@/features/roles/roleApi";
import { IAuth } from "@/types/Auth";
import { IUser } from "@/types/User";
import { Button, Stack } from "@mui/material";
import { useAddUserMutation, useUpdateUserMutation } from "../services/userApi";
import { Controller, useForm } from "react-hook-form";
import { UserSchema, UserValidation } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
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
  console.log(dataToEdit);
  const { data: roleList, isSuccess: roleSuccess } = useGetRolesQuery();
  const [addUser, { isSuccess: addSuccess }] = useAddUserMutation();
  const [updateUser, { isSuccess: updateSuccess }] = useUpdateUserMutation();

  const method = useForm<UserSchema>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      id: isAction == "Edit" ? dataToEdit?.id : "",
      password: isAction == "Edit" ? dataToEdit?.password : "",
      roles: isAction == "Edit" ? dataToEdit?.roles : [],
      active: "1",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = method;

  const submit = async (request: UserSchema) => {
    try {
      isAction == "New" ? await addUser(request) : await updateUser(request);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    reset(dataToEdit);
  }, [reset]);

  useEffect(() => {
    if (addSuccess) {
      toast.success(messages.add_success);
      onClose();
    }
  }, [addSuccess]);

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
    <form onSubmit={handleSubmit(submit)}>
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
        <MuiTextField
          name={"password"}
          label={"Password"}
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
                label={"Roles"}
                isAction={isAction}
              />
            )}
          />
        ) : null}
        {isAction == "Edit" ? (
          <MuiRadioGroup
            label={"Active"}
            name="active"
            options={ActiveItems}
            control={control}
          />
        ) : null}
        {isAction != "View" ? (
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isAction == "New" ? "Save" : "Update"}
          </Button>
        ) : null}
      </Stack>
    </form>
  );
};

export default UserForm;
