export interface IUser {
    name: string;
    email: string;
    password: string;
    avatar: string;
    role: "user" | "admin";

}

export interface IUserPayload {
  id: string;
  role: "user" | "admin"; 
}
