export type ErrorResponse = {
  error: {
    message: string;
  };
};

export type AxiosErrorResponse = {
  response: {
    data: ErrorResponse;
  };
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export interface Post {
  _id: string;
  title: string;
  content: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
