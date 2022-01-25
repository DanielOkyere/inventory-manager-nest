export class CreateUserDto {
  id:number;
  email: string;
  password: string;
  salt:string;
  firstName: string;
  lastName: string;
}
