export interface IEmployee {
  id: string | null;
  employeeId: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: Date | null;
  gender: string;
  address: string;
  departmentId: string;
  active: string | null;
}

export interface IEmployeeList extends IEmployee {
  fullName: string;
  departmentName: string;
  createdBy: string | null;
  createdOn: Date | null;
  modifiedBy: string | null;
  modifiedOn: Date | null;
}
