import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { IEmployeeList } from "@/types/Employee";
import { EmployeeSchema, EmployeeValidation } from "@/lib/validation/schema";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { useAppSelector } from "@/hooks/hooks";
import { selectAuth } from "@/features/auth/services/authSlice";
import { ActiveItems, GenderItems } from "@/data/data";
import { useGetDepartmentsQuery } from "@/features/department/services/departmentApi";
import {
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../services/employeeApi";
import {
  MuiRadioGroup,
  MuiSelectField,
  MuiTextField,
  MuiTextFieldArea,
} from "@/components/shared";

interface FormProps {
  isAction: string;
  dataToEdit: IEmployeeList | undefined;
  onClose: () => void;
}

const EmployeeForm = ({ onClose, dataToEdit, isAction }: FormProps) => {
  const { user } = useAppSelector(selectAuth);
  const { data: Departments, isSuccess: fetchingSuccess } =
    useGetDepartmentsQuery();
  const [addEmployee, { isSuccess: addSuccess }] = useAddEmployeeMutation();
  const [updateEmployee, { isSuccess: updateSuccess }] =
    useUpdateEmployeeMutation();

  const methods = useForm<EmployeeSchema>({
    resolver: zodResolver(EmployeeValidation),
    defaultValues: {
      employeeId: dataToEdit?.employeeId ? dataToEdit?.employeeId : "",
      departmentId: dataToEdit?.departmentId ? dataToEdit?.departmentId : "",
      gender: dataToEdit?.gender ? dataToEdit?.gender : "M",
      active: dataToEdit?.active ? dataToEdit?.active : "1",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  const submit = async (request: EmployeeSchema) => {
    try {
      isAction == "New"
        ? await addEmployee(request)
        : await updateEmployee(request);
    } catch (error) {
      console.log({ error });
    }
  };

  const testSubmit = useCallback((values: EmployeeSchema) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

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
    <form onSubmit={handleSubmit(testSubmit)}>
      <Grid container>
        {" "}
        <Grid item xs={12} sm={12} md={6}>
          <Stack spacing={2} margin={2}>
            <MuiTextField
              name={"employeeId"}
              label={"EmployeeId"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name={"firstName"}
              label={"First Name"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name={"lastName"}
              label={"Last Name"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name={"email"}
              label={"E-mail"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name={"phoneNumber"}
              label={"Phone Number"}
              control={control}
              isAction={isAction}
            />
            {fetchingSuccess ? (
              <MuiSelectField
                name="departmentId"
                label="Department"
                isAction={isAction}
                control={control}
                options={Departments}
                optionLabel="departmentName"
              />
            ) : null}
            <MuiTextField
              name="createdOn"
              label="Hire Date"
              control={control}
              isAction={isAction}
            />

            <MuiRadioGroup
              label={"Gender"}
              name="gender"
              options={GenderItems}
              control={control}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Stack spacing={2} margin={2}>
            <MuiTextFieldArea
              name={"address"}
              label={"Address"}
              control={control}
              isAction={isAction}
              rows={4}
              maxRows={4}
            />

            <MuiTextField
              name={"createdBy"}
              label={"Created By"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name="createdOn"
              label="Created Date"
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name={"modifiedBy"}
              label={"Modified By"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name="modifiedOn"
              label="Modified Date"
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
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Save
              </Button>
            ) : null}
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
export default EmployeeForm;
