import { JWTPayload } from "jose";
import { Document, ObjectId } from "mongodb";

export type TAuth = {
  _id?: string;
  password?: string;
  email?: string;
};
export type TAuthDto = {
  password: string;
  email?: string;
};

export type TAuthDocument = Document &
  Omit<TAuth, "_id" | "password"> & {
    passwordHash: string;
    _id?: ObjectId;
  };

export type TJWTPayload = JWTPayload & {
  userId?: string;
};
