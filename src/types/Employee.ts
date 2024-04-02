export interface IEmployee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  address: string;
  departmentId: string;
  active: string;
}

export interface IEmployeeList extends IEmployee {
  fullName: string;
  departmentName: string;
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
}
