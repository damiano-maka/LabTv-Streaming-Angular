export interface AuthRequestModel {
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponseModel {
    accessToken: string;
    user: UserModel;
  }
  
  export interface UserModel {
    name: string;
    email: string;
    id: number;
  }

  export interface UserbyID {
    email: string
    password: string
    name: string
    id: number
  }
  