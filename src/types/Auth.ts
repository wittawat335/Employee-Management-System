export interface IAuth {
  id: string;
  username: string;
  fullname: string;
  email: string;
  roles: string[];
  token: string;
  refreshToken: string;
}
