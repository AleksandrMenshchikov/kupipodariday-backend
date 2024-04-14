import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSigninDto {
  @MinLength(3)
  @MaxLength(64)
  @IsString()
  username: string;

  @MinLength(3)
  @IsString()
  password: string;
}
