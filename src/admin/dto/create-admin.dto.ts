import { Role } from "src/role.enum";

export class CreateAdminDto {
  email: string;
  password: string;
  salt:string;
  firstName: string;
  lastName: string;
  roles: Role[];
}
