import { IEmployeeList } from "@/types/Employee";
import { MouseEvent, useEffect } from "react";
import { useDeleteEmployeeMutation } from "../services/employeeApi";
import Swal from "sweetalert2";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Box, Button, ButtonGroup, IconButton, Paper } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { IAuth } from "@/types/Auth";
import Moment from "moment";

type Props = {
  data: Array<IEmployeeList>;
  user: IAuth | null;
  handleNew: (e: MouseEvent<HTMLButtonElement>) => void;
  handleUpdate: (id: string) => void;
  handleView: (id: string) => void;
};

const EmployeeList = ({
  data,
  user,
  handleNew,
  handleUpdate,
  handleView,
}: Props) => {
  const [
    deleteEmployee,
    { isSuccess: deleteSuccess, isError: deleteError, error },
  ] = useDeleteEmployeeMutation();

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
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
        await deleteEmployee(id);
      }
    });
  };

  const columns = [
    {
      name: "fullName",
      label: "Employee Name",
    },
    {
      name: "departmentName",
      label: "Department",
      options: {
        customBodyRender: (value: string) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
              value === "User"
                ? "bg-green-500"
                : value === "Employee"
                ? "bg-teal-600"
                : value === "Manager"
                ? "bg-cyan-600"
                : value === "Administrator"
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
      name: "email",
      label: "Email",
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        customBodyRender: (value: string) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
              value === "M"
                ? "bg-blue-700"
                : value === "F"
                ? "bg-rose-600"
                : "bg-purple-500"
            }`}
          >
            {value === "M" ? "Male" : value === "F" ? "Female" : "Other"}
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
      label: "Modified By",
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
              value ? "bg-green-600" : "bg-rose-600"
            }`}
          >
            {value ? <FaCheck /> : <FaXmark />}
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
                  aria-label="view"
                  color="secondary"
                  onClick={() => handleView(id)}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>

                {user.roles.indexOf("Hr") > -1 ||
                user.roles.indexOf("Developer") > -1 ? (
                  <>
                    <IconButton
                      aria-label="edit"
                      color="warning"
                      onClick={() => handleUpdate(id)}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
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

  useEffect(() => {
    if (deleteSuccess) toast.success(messages.delete_success);
  }, [deleteSuccess]);

  if (deleteError) {
    console.log({ error });
    navigate("/unauthorized");
  }

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" m={1}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box>
            <Button onClick={handleNew} variant="contained" color="info">
              {" "}
              New Employee
            </Button>
          </Box>
        </Box>
        <MUIDataTable
          title={"Employee List"}
          data={data}
          columns={columns}
          options={options}
        />
      </Paper>
    </>
  );
};

export default EmployeeList;
