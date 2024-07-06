import { iRole } from "./i-role";

export interface iUserRegistered{
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  roles: iRole[]
}
