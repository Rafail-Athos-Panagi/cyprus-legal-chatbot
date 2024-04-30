import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { GetCurrentUserId, Public } from '../common/decorators';
import { AtGuard } from '../common/guards';
import { ModelService } from './model.service';
import { QueryDataDto } from './dto/query-data.dto';
import { GetChatDto } from './dto/get-chat.dto';
import { GetFileDto } from './dto/get-file.dto';

@Controller('model')
export class ModelController {
  constructor(private modelService: ModelService) {}

  @SkipThrottle({ default: true })
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('new-chat')
  newChatModel(
    @GetCurrentUserId() userId: number,
    @Body() queryData: QueryDataDto,
  ): any {
    return this.modelService.newChatModel(userId, queryData);
  }

  @SkipThrottle({ default: true })
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('get-chat-titles')
  getChatTitles(@GetCurrentUserId() userId: number): any {
    return this.modelService.getChatTitles(userId);
  }

  @SkipThrottle({ default: true })
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('get-chat')
  getChat(
    @GetCurrentUserId() userId: number,
    @Body() chatStoreKey: GetChatDto,
  ): any {
    return this.modelService.getChat(userId, chatStoreKey.chatID);
  }

  @SkipThrottle({ default: true })
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('query-chat')
  queryChat(
    @GetCurrentUserId() userId: number,
    @Body() queryData: QueryDataDto,
  ): any {
    return this.modelService.queryChat(userId, queryData);
  }

  @SkipThrottle({ default: true })
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('get-file')
  getFile(
    @GetCurrentUserId() userId: number,
    @Body() getFileData: GetFileDto,
  ): any {
    return this.modelService.getFile(userId, getFileData);
  }

  /*  @SkipThrottle({ default: true })
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('chat')
  chatModel(@GetCurrentUserId() userId: number , @Body() queryData: QueryDataDto): any {
    return this.modelService.chatModel(userId ,queryData);
  } */
}
