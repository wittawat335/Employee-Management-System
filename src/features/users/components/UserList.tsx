import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import { MouseEvent, useEffect } from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useDeleteUserMutation } from "../services/userApi";
import { IUser } from "@/types/User";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";

type Props = {
  data: Array<IUser>;
  handleNewUser: (e: MouseEvent<HTMLButtonElement>) => void;
  handleUpdateUser: (id: string) => void;
  handleViewUser: (id: string) => void;
};

const UserList = ({
  data,
  handleNewUser,
  handleUpdateUser,
  handleViewUser,
}: Props) => {
  const [deleteUser, { isSuccess: deleteSuccess }] = useDeleteUserMutation();

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteUser(id);
        }
      });
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const columns = [
    {
      name: "username",
      label: "UserName",
    },
    {
      name: "email",
      label: "E-Mail",
    },
    {
      name: "roles",
      label: "Role",
      options: {
        customBodyRender: (value: string[]) =>
          value.map((item) => (
            <p
              className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
                item === "User"
                  ? "bg-green-500"
                  : item === "Employee"
                  ? "bg-teal-600"
                  : item === "Manager"
                  ? "bg-cyan-600"
                  : item === "Administrator"
                  ? "bg-sky-700"
                  : "bg-indigo-600"
              }`}
            >
              {item}
            </p>
          )),
      },
    },
    {
      name: "active",
      label: "Active",
      options: {
        customBodyRender: (value: string) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
              value === "1" ? "bg-green-600" : "bg-rose-600"
            }`}
          >
            {value === "1" ? <FaCheck /> : <FaXmark />}
          </p>
        ),
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (id: string) => {
          return (
            <>
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button onClick={() => handleUpdateUser(id)}>Edit</Button>
                <Button onClick={() => handleDelete(id)}>Delete</Button>
              </ButtonGroup>
            </>
          );
        },
      },
    },
  ];

  const options: MUIDataTableOptions | undefined = {
    selectableRows: "none",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25, 100],
  };

  useEffect(() => {
    if (deleteSuccess) toast.success(messages.delete_success);
  }, [deleteSuccess]);

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" m={1}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box>
            <Button onClick={handleNewUser} variant="contained" color="info">
              {" "}
              Add User
            </Button>
          </Box>
        </Box>
        <MUIDataTable
          title={"User List"}
          data={data}
          columns={columns}
          options={options}
        />
      </Paper>
    </>
  );
};

export default UserList;
