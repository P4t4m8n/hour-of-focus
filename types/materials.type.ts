import { Document, ObjectId } from "mongodb";

export type TMaterial = {
  _id?: string;
  imgPath?: string;
  link: string;
  subject: string;
  updatedAt?: string;
  createdAt?: string;
};

export type TMaterialDto = Omit<
  TMaterial,
  "createBy" | "updateBy" | "createdAt"
> & {

};

export type TMaterialDocument = Document &
  Omit<TMaterial, "_id" | "createBy" | "updateBy" | "createdAt"> & {
    _id?: ObjectId;
    updatedAt?: Date;
  };

export type TMaterialFilter = {
  isFull?: boolean;
};
