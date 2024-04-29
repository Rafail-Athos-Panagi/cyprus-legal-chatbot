import axios from "axios";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// const tokenCache: any = {}; // Create a cache object

const refreshToken = async (token: JWT): Promise<JWT> => {
  // Check if the result is already cached for this refresh_token
  /* if (token.backendTokens.refresh_token in tokenCache) {
    console.log("CACHE")
    return tokenCache[token.backendTokens.refresh_token];
  } */

  const res = await fetch(process.env.NEXTAUTH_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.backendTokens.refresh_token}`,
    },
  });

  const response = await res.json();

  const refreshedToken = {
    ...token,
    backendTokens: response,
  };

  // Cache the refreshed token for this refresh_token
  // tokenCache[token.backendTokens.refresh_token] = refreshedToken;

  // console.log("REFRESH TOKEN", refreshedToken);
  
  return refreshedToken;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please fill the fields with your credentials");
        }
        try {
          const res = await axios.post(
            "http://localhost:3333/auth/signin",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          return res.data;
        } catch (error: any) {
          if (error.response.status === 401) {
            throw new Error("Invalid Email or Password");
          } else if (error.response.status === 406) {
            throw new Error("Not verified user");
          } else if (error.response.status === 429) {
            throw new Error("Too many attempts. Please try again later");
          }
        }
        /* console.log("route",res); */
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (new Date().getTime() < token.backendTokens.expiresIn) {
        return token;
      }

      else {
        return await refreshToken(token);
      }
    },

    async session({ token, session }) {
      session.user = token.user;
      session.userConfig = token.userConfig;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
