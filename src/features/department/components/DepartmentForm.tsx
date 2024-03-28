import { IDepartment, IDepartmentList } from "@/types/Department";
import {
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../services/departmentApi";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DepartmenSchema, DepartmentValidation } from "@/lib/validation/schema";
import { Button, Grid, Stack } from "@mui/material";
import { IAuth } from "@/types/Auth";
import { ActiveItems } from "@/data/data";
import { MuiRadioGroup, MuiTextField } from "@/components/shared";

type FormProps = {
  user: IAuth | null;
  isAction: string;
  dataToEdit: IDepartmentList | undefined;
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
    values: dataToEdit,
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

  const testSubmit = useCallback((values: DepartmenSchema) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

  useEffect(() => {
    if (isAddError) {
      if (addError?.data.StatusCode === 400)
        toast.error(JSON.stringify(addError?.data?.Message));

      console.log(addError?.data);
    }
  }, [isAddError]);

  //useEffect(() => {
  //  reset(dataToEdit);
  // }, [reset]);

  //useEffect(() => {
  // console.log(dataToEdit);
  //}, [dataToEdit]);

  useEffect(() => {
    if (addSuccess) {
      toast.success(messages.add_success);
      reset();
      onClose();
    }
  }, [addSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success(messages.update_success);
      reset();
      onClose();
    }
  }, [updateSuccess]);

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(testSubmit)}>
        <Grid container>
          {" "}
          <Grid item xs={12} sm={12} md={12}>
            <Stack spacing={2} margin={2}>
              <MuiTextField
                name={"departmentId"}
                label={"Department ID"}
                control={control}
                isAction={isAction}
              />
              <MuiTextField
                name={"departmentName"}
                label={"Department Name"}
                control={control}
                isAction={isAction}
              />
              <MuiRadioGroup
                label={"Active"}
                name="active"
                options={ActiveItems}
                control={control}
              />
              {isAction != "View" ? (
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              ) : null}
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default DepartmentForm;
