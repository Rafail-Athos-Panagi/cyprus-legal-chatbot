import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailCheckDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

}