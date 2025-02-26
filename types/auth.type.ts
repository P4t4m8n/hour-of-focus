import { JWTPayload } from "jose";
import { Document, ObjectId } from "mongodb";

export type TAuth = {
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
};
export type TAuthDto = {
  password: string;
  username?: string;
  email?: string;
};

export type TUserDocument = Document &
  Omit<TAuth, "_id" | "password"> & {
    passwordHash: string;
    _id?: ObjectId;
  };

export type TJWTPayload = JWTPayload & {
  userId?: string;
};
