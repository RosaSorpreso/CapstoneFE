import { iRole } from "./i-role";
import { iTravelLight } from "./i-travel-light";

export interface iUserComplete {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  travelsPurchased: iTravelLight[],
  wishlist: iTravelLight[],
  roles?: iRole[],
  password?: string
}
