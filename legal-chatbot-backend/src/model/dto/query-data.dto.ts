import { IsNotEmpty , IsString } from 'class-validator';

export class QueryDataDto {
  @IsNotEmpty()
  @IsString()
  query: string;

  @IsNotEmpty()
  @IsString()
  chatID: string;
}