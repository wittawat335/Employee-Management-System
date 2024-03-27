export interface IDepartment {
  id: string;
  departmentId: string;
  departmentName: string;
  active: string;
}
export interface IDepartmentList extends IDepartment {
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
}
