import { Document, ObjectId } from "mongodb";
import { TAuth } from "./auth.type";

export type TArticle = {
  _id?: string;
  link: string;
  preview: string;
  publishDate: string;
  publishPlace: string;
  createBy?: TAuth;
  updateBy?: TAuth;
  updateAt?: string;
  createAt?: string;
};

export type TArticleDto = Omit<
  TArticle,
  "createBy" | "updateBy" | "createdAt"
> & {
  createBy?: string;
  updateBy?: string;
};

export type TArticleDocument = Document &
  Omit<
    TArticle,
    "_id" | "createBy" | "updateBy" | "createdAt" 
  > & {
    _id?: ObjectId;
    createBy?: ObjectId;
    updateBy?: ObjectId;
    updateAt?: Date;
  };
