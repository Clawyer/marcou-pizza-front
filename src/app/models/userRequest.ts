export interface RefreshToken {
  id: number;
  userId: number;
  token: string;
  refreshCount: number;
  expiryDate: Date;
}

/*
Interface for the Login Response (can look different, based on your backend api)
*/
export interface LoginResponse {
  accessToken: string;
  refreshToken: RefreshToken;
  tokenType: string;
}

/*
Interface for the Login Request (can look different, based on your backend api)
*/
export interface LoginRequest {
  email: string;
  password: string;
}

/*
Interface for the Register Request (can look different, based on your backend api)
*/
export interface RegisterRequest {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmpwd: string;
}

/*
Interface for the Register Response (can look different, based on your backend api)
*/
export interface RegisterResponse {
  status: number;
  message: string;
}
