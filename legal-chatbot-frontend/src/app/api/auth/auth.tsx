import axios from "axios";
import { SignUpCredentials } from "@/app/lib/interfaces/SignUpCredentials";
import { ActivateAccount } from "@/app/lib/interfaces/ActivateAccount";
import { ResetPassword } from "@/app/lib/interfaces/ResetPassword";

export const EMAIL_CHECK = async (emailValue: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/auth/email-check",
      {
        email: emailValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.request.status;
  } catch (error: any) {
    return error.response.data.statusCode;
  }
};

export const SIGNUP = async (credentials: SignUpCredentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/auth/signup",
      {
        email: credentials.email,
        password: credentials.password,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        dateOfBirth: credentials.dateOfBirth,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      expiresIn: response.data.expiresIn,
      status: response.request.status,
    };
  } catch (error: any) {
    return {
      expiresIn: null,
      status: error.response.data.statusCode,
    };
  }
};

export const ACTIVATE_ACCOUNT = async (credentials: ActivateAccount) => {
  try {
    const response = await axios.put(
      "http://localhost:3333/auth/activate-account",
      {
        email: credentials.email,
        actCode: credentials.actCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.request.status;
  } catch (error: any) {
    return error.response.data.statusCode;
  }
};

export const SEND_NEW_ACTIVATION_CODE = async (emailValue: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/auth/send-activation-code",
      {
        email: emailValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      expiresIn: response.data.expiresIn,
      status: response.request.status,
    };
  } catch (error: any) {
    return {
      expiresIn: null,
      status: error.response.data.statusCode,
    };
  }
};

export const SEND_FORGET_PASSWORD_REQUEST = async (emailValue: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/auth/forget-password",
      {
        email: emailValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      status: response.request.status,
    };
  } catch (error: any) {
    return {
      status: error.response.data.statusCode,
    };
  }
};

export const RESET_PASSWORD = async (credentials: ResetPassword) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/auth/reset-password",
      {
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
      }
    );

    return {
      status: response.request.status,
    };
  } catch (error: any) {
    return {
      status: error.response.data.statusCode,
    };
  }
};

export const LOG_OUT = async (at: string) => {
  try {
    console.log(at);
    const response = await axios.post(
      "http://localhost:3333/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${at}`,
        },
      }
    );

    return {
      status: response.request.status,
    };
  } catch (error: any) {
    return {
      status: error.response.data.statusCode,
    };
  }
};
