import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breakpoint, Container } from "@mui/material";
import { useGetEmployeesQuery } from "../services/employeeApi";
import { IEmployeeList } from "@/types/Employee";
import { Loader, MuiDialog } from "@/components/shared";
import EmployeeList from "./EmployeeList";
import EmployeeForm from "./EmployeeForm";
import { useAppSelector } from "@/hooks/hooks";
import { selectAuth } from "@/features/auth/services/authSlice";

const Employee = () => {
  const { user } = useAppSelector(selectAuth);
  const [title, setTitle] = useState("New");
  const [maxWidth, setMaxWidth] = useState<Breakpoint | false>("sm");
  const [openDialog, setOpenDialog] = useState(false);
  const [isAction, setIsAction] = useState("New");
  const [dataToEdit, setDataToEdit] = useState<IEmployeeList | undefined>(
    undefined
  );
  const {
    data: Employees,
    isError,
    error,
    isFetching,
    isLoading,
    isSuccess: fetchingSuccess,
  } = useGetEmployeesQuery();
  const navigate = useNavigate();

  if (isError) {
    console.log({ error });
    navigate("/unauthorized");
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const handleNew = () => {
    setTitle("New Employee");
    setIsAction("New");
    setMaxWidth("md");
    setDataToEdit(undefined);
    handleOpenDialog();
  };

  const handleUpdate = (id: string) => {
    setTitle("Update Employee");
    setIsAction("Edit");
    setDataToEdit(Employees?.find((item) => item.id === id));
    handleOpenDialog();
  };

  const handleView = (id: string) => {
    setTitle("View Employee");
    setIsAction("View");
    setDataToEdit(Employees?.find((item) => item.id === id));
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Container maxWidth={false} sx={{ p: 2 }}>
        {fetchingSuccess ? (
          <EmployeeList
            data={Employees}
            user={user}
            handleNew={handleNew}
            handleUpdate={handleUpdate}
            handleView={handleView}
          />
        ) : null}

        <MuiDialog
          title={title}
          openPopup={openDialog}
          maxWidth={maxWidth}
          setOpenPopup={setOpenDialog}
        >
          <EmployeeForm
            isAction={isAction}
            dataToEdit={dataToEdit}
            onClose={handleCloseDialog}
          />
        </MuiDialog>
      </Container>
    </>
  );
};

export default Employee;
