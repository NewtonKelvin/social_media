export interface Post {
  token: string;
  postToken: string;
  userId: number;
  description: string;
  files: string[];
  id: number;
  privacity?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  shares: number;
  user: User;
  comments: Comments[];
}

export interface Comments {
  id: number;
  likes: number;
  postToken: string;
  token: string;
  updatedAt: string;
  userId: number;
  value: string;
  user: User;
}

export interface User {
  name: string;
  username: string;
  avatar: string;
  id?: number;
  cover?: string;
  email?: string;
  bio?: string;
  createdAt?: string;
}
