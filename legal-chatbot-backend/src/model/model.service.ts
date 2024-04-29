import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { QueryDataDto } from './dto/query-data.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { GetFileDto } from './dto/get-file.dto';

@Injectable()
export class ModelService {
  constructor(private prisma: PrismaService) {}

  async newChatModel(userID: number, queryData: QueryDataDto) {

    const user = await this.prisma.user.findUnique({
      where: {
        userId: userID,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    try {
      const response = await axios.post(
        'http://127.0.0.1:3334/take_result',
        {
          query: queryData.query,
          chat_store_key: queryData.chatID,
          chat_name_key: user.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      let chatTitle = '';

      if (queryData.query.length <= 20) {
        chatTitle = queryData.query;
      } else {
        chatTitle = queryData.query.slice(0, 20) + '...';
      }
      await this.prisma.userChatHistory
        .create({
          data: {
            userId: user.userId,
            chatNameKey: user.email,
            chatStoreKey: response.data['memory_data']['chat_store_key'],
            title: chatTitle,
          },
        })
        .catch((error) => {
          if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              throw new ForbiddenException('Credentials incorrect');
            }
          }
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async getChatTitles(userID: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userID,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const userChatHistory = await this.prisma.userChatHistory.findMany({
      where: {
        userId: userID,
      },
    });

    return userChatHistory;
  }

  async getChat(userID: number, chatStoreKey: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userID,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    try {
      const response = await axios.post(
        'http://127.0.0.1:3334/get_chat',
        {
          chat_store_key: chatStoreKey,
          chat_name_key: user.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async queryChat(userID: number, queryData: QueryDataDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userID,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    try {
      const response = await axios.post(
        'http://127.0.0.1:3334/take_result',
        {
          query: queryData.query,
          chat_store_key: queryData.chatID,
          chat_name_key: user.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getFile(userID: number, getFileData: GetFileDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userID,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    try {
      const response = await axios.post(
        'http://127.0.0.1:3334/get_file',
        {
          file_name: getFileData.fileName,
        },
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
