import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  // For API-level create user DTO we accept plain password (hashed in service)
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
