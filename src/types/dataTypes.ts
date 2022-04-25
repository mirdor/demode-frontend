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

// Generated by https://quicktype.io

export interface Post {
  _id: string;
  title: string;
  content: string;
  img: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Author {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  img: string;
  starts_at: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
