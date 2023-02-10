export interface AuthResult{
    id:number,
    login:string,
    email:string,
    token:string,
    ErrorMessage:string,
}
export interface LoginRequest{
    login:string,
    password:string,
}

export interface UserModel{
  id:number,
  email:string,
  status:string,
  password:string,
  login:string,
}
export interface RegisterRequest{
  login:string,
  password:string,
  email:string,
  status:string,
}