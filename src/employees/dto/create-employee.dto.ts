import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateEmployeeDto {
  id: string;
  @IsString()
  @MaxLength(30)
  employeeName: string;
  @IsString()
  @MaxLength(70)
  employeeLastName: string;
  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string;
  @IsString()
  @IsEmail()
  employeeEmail: string;
}
