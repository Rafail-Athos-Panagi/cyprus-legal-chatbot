import { QueryData } from "@/app/lib/interfaces/QueryData";
import axios from "axios";

export const NEW_CHAT = async (queryData: QueryData) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/model/new-chat",
      {
        query: queryData.query,
        chatID: queryData.chatID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${queryData.token}`,
        },
      }
    );

    return response.request.status;
  } catch (error: any) {
    return error.response.data.statusCode;
  }
};

export const GET_CHAT_TITLES = async (token: string) => {
  try {
    const response = await axios.get(
      "http://localhost:3333/model/get-chat-titles",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.statusCode;
  }
};

export const GET_CHAT = async (token: string, chatID: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/model/get-chat",
      {
        chatID: chatID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.statusCode;
  }
};

export const QUERY_CHAT = async (queryData: QueryData) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/model/query-chat",
      {
        query: queryData.query,
        chatID: queryData.chatID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${queryData.token}`,
        },
      }
    );
    return response.data
  } catch (error: any) {
    return error.response.data.statusCode;
  }
};

export const GET_FILE = async (fileName: string , token: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/model/get-file",
      {
        fileName: fileName
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const bufferData = response.data.data;
    const arrayBuffer = new Uint8Array(bufferData).buffer;
    const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    return url

    // return response.data
  } catch (error: any) {
    return error.response.data.statusCode;
  }

  
};
