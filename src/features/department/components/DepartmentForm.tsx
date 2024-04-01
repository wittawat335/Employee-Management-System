import { IDepartment } from "@/types/Department";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DepartmenSchema, DepartmentValidation } from "@/lib/validation/schema";
import { Button, Grid, Stack } from "@mui/material";
import { IAuth } from "@/types/Auth";
import { ActiveItems } from "@/data/data";
import {
  MuiRadioGroup,
  MuiTextField,
  MuiTextFieldReadOnly,
} from "@/components/shared";
import {
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../services/departmentApi";

type FormProps = {
  user: IAuth | null;
  isAction: string;
  dataToEdit: IDepartment | undefined;
  onClose: () => void;
};

const DepartmentForm = ({ user, onClose, dataToEdit, isAction }: FormProps) => {
  const [
    addDepartment,
    { isSuccess: addSuccess, isError: isAddError, error: addError },
  ] = useAddDepartmentMutation();
  const [updateDepartment, { isSuccess: updateSuccess }] =
    useUpdateDepartmentMutation();

  const methods = useForm<DepartmenSchema>({
    resolver: zodResolver(DepartmentValidation),
    defaultValues: {
      departmentId: "",
      active: "1",
      createdBy: user?.username,
      modifiedBy: user?.username,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  const submit = async (request: DepartmenSchema) => {
    isAction == "New"
      ? await addDepartment(request)
      : await updateDepartment(request);
  };

  useEffect(() => {
    if (isAddError) {
      if (addError?.data.StatusCode === 400) toast.error(JSON.stringify(addError?.data?.Message));
    }
  }, [isAddError]);

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

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(submit)}>
        <Grid container>
          {" "}
          <Grid item xs={12} sm={12} md={12}>
            <Stack spacing={2} margin={2}>
              {isAction == "Edit" ? (
                <MuiTextFieldReadOnly
                  name={"departmentId"}
                  label={"Department ID"}
                  control={control}
                />
              ) : null}
              <MuiTextField
                name={"departmentName"}
                label={"Department Name"}
                control={control}
                isAction={isAction}
              />
              {isAction == "Edit" ? (
                <MuiRadioGroup
                  label={"Active"}
                  name="active"
                  options={ActiveItems}
                  control={control}
                />
              ) : null}
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isAction == "New" ? "Save" : "Update"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default DepartmentForm;
