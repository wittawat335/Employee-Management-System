export interface IDepartment {
  id: string;
  departmentId: string;
  departmentName: string;
  active: string;
  createdBy: string;
  modifiedBy: string | undefined;
}
export interface IDepartmentList extends IDepartment {
  createdOn: Date;
  modifiedOn: Date;
}
