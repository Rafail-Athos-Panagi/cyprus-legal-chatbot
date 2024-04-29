import { IsNotEmpty , IsString } from 'class-validator';

export class GetChatDto {
  @IsNotEmpty()
  @IsString()
  chatID: string;
}