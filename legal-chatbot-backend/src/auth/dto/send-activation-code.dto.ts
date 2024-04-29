import { IsNotEmpty, IsString } from 'class-validator';

export class SendActivationCodeDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}