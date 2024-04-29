export type signInData = {
  user: {
    name: string;
    surname: string;
    id: number;
    email: string;
    activate: boolean
  };
  backendTokens: {
    access_token: string;
    refresh_token: string;
    expiresIn: number;
  };
};
