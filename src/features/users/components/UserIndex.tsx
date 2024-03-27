import { useGetUsersQuery } from "../services/userApi";
import { useState } from "react";
import { IUser } from "@/types/User";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import Loader from "@/components/ui/Loader";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import UserForm from "./UserForm";
import { useAppSelector } from "@/hooks/hooks";
import { selectAuth } from "@/features/auth/services/authSlice";

const UserIndex = () => {
  const { user } = useAppSelector(selectAuth);
  const [title, setTitle] = useState("New User");
  const [openDialog, setOpenDialog] = useState(false);
  const [isAction, setIsAction] = useState("New");
  const [dataToEdit, setDataToEdit] = useState<IUser | undefined>(undefined);
  const { data, isError, error, isFetching, isLoading, isSuccess } =
    useGetUsersQuery();
  const navigate = useNavigate();

  if (isError) {
    console.log({ error });
    navigate("/unauthorized");
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const handleNewUser = () => {
    setTitle("New User");
    setIsAction("New");
    setDataToEdit(undefined);
    handleOpenDialog();
  };

  const handleUpdateUser = (id: string) => {
    setTitle("Update User");
    setIsAction("Edit");
    setDataToEdit(data?.find((item) => item.id === id));
    handleOpenDialog();
  };

  const handleViewUser = (id: string) => {
    setTitle("View User");
    setIsAction("View");
    setDataToEdit(data?.find((item) => item.id === id));
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
        {isSuccess ? (
          <UserList
            data={data}
            handleNewUser={handleNewUser}
            handleUpdateUser={handleUpdateUser}
            handleViewUser={handleViewUser}
          />
        ) : null}

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <span>{title}</span>
            <IconButton style={{ float: "right" }} onClick={handleCloseDialog}>
              <CancelIcon color="inherit" fontSize="large" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <UserForm
              auth={user}
              isAction={isAction}
              dataToEdit={dataToEdit}
              onClose={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default UserIndex;
