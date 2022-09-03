export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}
export interface UserResponse {
  email: string;
  fullName: string;
  accessToken: string;
  refreshToken: string;
  roles: string[];
}
