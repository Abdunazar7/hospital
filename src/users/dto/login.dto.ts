import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDtoUserDto {
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Password should not be empty" })
  password: string;
}
