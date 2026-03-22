import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsEmail({}, {message:"Please provide a valid email address"})
  email: string;

  @IsString()
  @MinLength(6, {message:"Password must be atleast 6 characters long"})
  password: string;
}
