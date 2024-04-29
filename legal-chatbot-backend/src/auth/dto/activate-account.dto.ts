import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActivateAccountDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  actCode: number;
}
