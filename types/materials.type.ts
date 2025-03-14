import { Document, ObjectId } from "mongodb";
import { TAuth } from "./auth.type";

export type TMaterial = {
  _id?: string;
  imgPath?: string;
  link: string;
  subject: string;
  createBy?: TAuth;
  updateBy?: TAuth;
  updatedAt?: string;
  createdAt?: string;
};

export type TMaterialDto = Omit<
  TMaterial,
  "createBy" | "updateBy" | "createdAt"
> & {
  createBy?: string;
  updateBy?: string;
};

export type TMaterialDocument = Document &
  Omit<TMaterial, "_id" | "createBy" | "updateBy" | "createdAt"> & {
    _id?: ObjectId;
    createBy?: ObjectId;
    updateBy?: ObjectId;
    updatedAt?: Date;
  };

export type TMaterialFilter = {
  isFull?: boolean;
};
