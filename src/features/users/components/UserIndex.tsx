import { useGetUsersQuery } from "../services/userApi";
import { useState } from "react";
import { IUser } from "@/types/User";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/hooks";
import { selectAuth } from "@/features/auth/services/authSlice";
import { Breakpoint, Container } from "@mui/material";
import { MuiDialog } from "@/components/shared";
import UserList from "./UserList";
import Loader from "@/components/ui/Loader";
import UserForm from "./UserForm";

const UserIndex = () => {
  const { user } = useAppSelector(selectAuth);
  const [title, setTitle] = useState("New User");
  const [maxWidth, setMaxWidth] = useState<Breakpoint | false>("sm");
  const [openDialog, setOpenDialog] = useState(false);
  const [isAction, setIsAction] = useState("New");
  const [dataToEdit, setDataToEdit] = useState<IUser | undefined>(undefined);
  const { data, isError, error, isFetching, isLoading, isSuccess } =
    useGetUsersQuery();
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
    setTitle("New User");
    setIsAction("New");
    setDataToEdit(undefined);
    handleOpenDialog();
  };

  const handleUpdate = (id: string) => {
    setTitle("Update User");
    setIsAction("Edit");
    setDataToEdit(data?.find((item) => item.id === id));
    handleOpenDialog();
  };

  const handleView = (id: string) => {
    setTitle("View User");
    setIsAction("View");
    setDataToEdit(data?.find((item) => item.id === id));
    handleOpenDialog();
  };

  return (
    <>
      <Container maxWidth={false} sx={{ p: 2 }}>
        {isSuccess ? (
          <UserList
            data={data}
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
          <UserForm
            auth={user}
            isAction={isAction}
            dataToEdit={dataToEdit}
            onClose={handleCloseDialog}
          />
        </MuiDialog>
      </Container>
    </>
  );
};

export default UserIndex;
