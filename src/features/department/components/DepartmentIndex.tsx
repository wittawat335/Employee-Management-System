import { IDepartmentList } from "@/types/Department";
import { Breakpoint, Container } from "@mui/material";
import { useState } from "react";
import { useGetDepartmentsQuery } from "../services/departmentApi";
import { useNavigate } from "react-router-dom";
import { Loader, MuiDialog } from "@/components/shared";
import { useAppSelector } from "@/hooks/hooks";
import { selectAuth } from "@/features/auth/services/authSlice";
import DepartmentList from "./DepartmentList";
import DepartmentForm from "./DepartmentForm";

const DepartmentIndex = () => {
  const { user } = useAppSelector(selectAuth);
  const [title, setTitle] = useState("New");
  const [maxWidth, setMaxWidth] = useState<Breakpoint | false>("sm");
  const [openDialog, setOpenDialog] = useState(false);
  const [isAction, setIsAction] = useState("New");
  const [dataToEdit, setDataToEdit] = useState<IDepartmentList | undefined>(
    undefined
  );
  const {
    data: Departments,
    isError,
    error,
    isFetching,
    isLoading,
    isSuccess: fetchingSuccess,
  } = useGetDepartmentsQuery();
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (isError) {
    console.log({ error });
    navigate("/unauthorized");
  }

  if (isLoading || isFetching) return <Loader />;

  const handleNew = () => {
    setTitle("New Department");
    setIsAction("New");
    setDataToEdit(undefined);
    handleOpenDialog();
  };

  const handleUpdate = (id: string) => {
    setTitle("Update Department");
    setIsAction("Edit");
    setDataToEdit(Departments?.find((item) => item.id === id));
    handleOpenDialog();
  };

  const handleView = (id: string) => {
    setTitle("View Department");
    setIsAction("View");
    setDataToEdit(Departments?.find((item) => item.id === id));
    handleOpenDialog();
  };

  return (
    <>
      <Container maxWidth={false} sx={{ p: 2 }}>
        {fetchingSuccess ? (
          <DepartmentList
            data={Departments}
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
          <DepartmentForm
            user={user}
            isAction={isAction}
            dataToEdit={dataToEdit}
            onClose={handleCloseDialog}
          />
        </MuiDialog>
      </Container>
    </>
  );
};

export default DepartmentIndex;
