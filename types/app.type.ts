import { QUILL_TEXT_SIZES } from "@/constants/quill";

export type TValidationError<T> = Record<keyof T, string>;

export type TFormState<T> = {
  errors?: TValidationError<T> | null;
  message?: string;
  data?: T;
};

export type TEntity = {
  _id?: string;
};

export type TAcccibility = {
  zoom: number;
  grayscale: boolean;
  "invert-contrast": boolean;
  "highlight-links": boolean;
  "highlight-headers": boolean;
  "stop-animations": boolean;
};

export type TQuillTextSize = (typeof QUILL_TEXT_SIZES)[number];
export type TInsert = string;

export type TQuillAttributes = {
  size?: TQuillTextSize;
  underline?: boolean;
  italic?: boolean;
  bold?: boolean;
  color?: string;
  link?: string;
  
};


export type TTextBlock = {
  attributes?: TQuillAttributes;
  insert: string;
};
