import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      surname: string;
      dateOfBirth: string;
      activate: boolean;
    };
    userConfig: {
      theme: string;
    };
    backendTokens: {
      access_token: string;
      refresh_token: string;
      expiresIn: number;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
      surname: string;
      dateOfBirth: string;
      activate: boolean;
    };
    userConfig: {
      theme: string;
    };
    backendTokens: {
      access_token: string;
      refresh_token: string;
      expiresIn: number;
    };
  }
}
