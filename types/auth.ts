import { Decimal } from "@prisma/client/runtime/client";

export interface Subscription {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  planId: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Purchases {
  id: string;
  createdAt: Date;
  userId: string;
  movieId: number | null;
  serialId: number | null;
  price: Decimal;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string | null;
  username: string;
  subscriptions?: Subscription | null;
  purchases?: Purchases[];
}

export interface AuthState {
  user?: User;
  isAuthenticated: boolean;
}
