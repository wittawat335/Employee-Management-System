import { MouseEvent, useEffect } from "react";
import { IDepartmentList } from "@/types/Department";
import { Box, Button, ButtonGroup, IconButton, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { IAuth } from "@/types/Auth";
import { useDeleteDepartmentMutation } from "../services/departmentApi";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Moment from "moment";

type Props = {
  data: Array<IDepartmentList>;
  user: IAuth | null;
  handleNew: (e: MouseEvent<HTMLButtonElement>) => void;
  handleUpdate: (id: string) => void;
};

const DepartmentList = ({ data, user, handleNew, handleUpdate }: Props) => {
  const [deleteDepartment, { isSuccess: deleteSuccess, isError, error }] =
    useDeleteDepartmentMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDepartment(id);
      }
    });
  };

  if (isError) {
    alert("1");
    console.log({ error });
  }

  if (deleteSuccess) {
    toast.success(messages.delete_success);
  }

  // useEffect(() => {
  //   if (deleteSuccess) {
  //     toast.success(messages.delete_success);
  //   }
  // }, [deleteSuccess]);

  const columns = [
    {
      name: "departmentId",
      label: "ID",
    },
    {
      name: "departmentName",
      label: "Name",
      options: {
        customBodyRender: (value: string) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
              value === "User"
                ? "bg-green-500"
                : value === "IT"
                ? "bg-teal-600"
                : value === "Marketing"
                ? "bg-cyan-600"
                : value === "Developer"
                ? "bg-sky-700"
                : "bg-indigo-600"
            }`}
          >
            {value}
          </p>
        ),
      },
    },

    {
      name: "createdBy",
      label: "CreatedBy",
    },
    {
      name: "createdOn",
      label: "Created On",
      options: {
        customBodyRender: (value: Date) => {
          return <>{Moment(value).format("DD/MM/YYYY HH:mm")}</>;
        },
      },
    },
    {
      name: "modifiedBy",
      label: "Modifie dBy",
    },
    {
      name: "modifiedOn",
      label: "Modified On",
      options: {
        customBodyRender: (value: Date) => {
          return <>{Moment(value).format("DD/MM/YYYY HH:mm")}</>;
        },
      },
    },
    {
      name: "active",
      label: "Active",
      options: {
        customBodyRender: (value: string) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
              value == "1" ? "bg-green-600" : "bg-rose-600"
            }`}
          >
            {value == "1" ? <FaCheck /> : <FaXmark />}
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
                <IconButton
                  aria-label="edit"
                  color="warning"
                  onClick={() => handleUpdate(id)}
                >
                  <EditOutlinedIcon />
                </IconButton>

                {user.roles.indexOf("Administrator") > -1 ||
                user.roles.indexOf("Developer") > -1 ? (
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
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

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" m={1}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box>
            <Button onClick={handleNew} variant="contained" color="info">
              {" "}
              New Department
            </Button>
          </Box>
        </Box>
        <MUIDataTable
          title={"Department List"}
          data={data}
          columns={columns}
          options={options}
        />
      </Paper>
    </>
  );
};

export default DepartmentList;
