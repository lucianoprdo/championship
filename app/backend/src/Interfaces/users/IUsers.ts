export type IUsers = {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
};

export type Token = { token: string };

export type Login = { email: string; password: string };
