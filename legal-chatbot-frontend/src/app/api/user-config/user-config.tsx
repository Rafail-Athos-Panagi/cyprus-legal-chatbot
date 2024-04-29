import axios from "axios";

export const CHANGE_THEME = async (theme: string, token: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/auth/change-theme-config",
      {
        theme: theme,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.request.status;
  } catch (error: any) {
    return error.response.data.statusCode;
  }
};
