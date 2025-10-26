import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsUrl } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
