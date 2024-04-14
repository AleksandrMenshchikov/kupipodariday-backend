import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSignupDto {
  @MinLength(3)
  @MaxLength(64)
  @IsString()
  username: string;

  @MinLength(3)
  @MaxLength(200)
  @IsString()
  @IsOptional()
  about?: string;

  @IsUrl()
  @IsString()
  @IsOptional()
  avatar?: string;

  @IsEmail()
  @IsString()
  email: string;

  @MinLength(3)
  @IsString()
  password: string;
}
