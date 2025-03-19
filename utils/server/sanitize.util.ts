import "server-only";
//Sanitation
import sanitizeHtml from "sanitize-html";
//Types
import { TQuillAttributes, TQuillTextSize, TTextBlock } from "@/types/app.type";
//Constants
import { ALLOWED_ATTRIBUTES } from "@/constants/quill";
/**
 * Sanitizes a field from FormData.
 * @param formData The FormData object.
 * @param fieldName The name of the form field to sanitize.
 * @returns The sanitized string.
 */
const sanitizedFormField = (formData: FormData, fieldName: string): string => {
  return sanitizeHtml(formData.get(fieldName)?.toString() || "");
};
/**
 * Sanitizes an object field.
 * @param value The value to sanitize.
 * @returns The sanitized string or null if no value is provided.
 */
const sanitizedObjectField = (value?: string | null | number): string => {
  if (!value) return "";
  return sanitizeHtml(value.toString());
};
/**
 * Returns a boolean value.
 * @param value The boolean value to sanitize.
 * @returns True if value is truthy, otherwise false.
 */
const sanitizedBoolean = (value?: unknown): boolean => {
  return !sanitizeHtml(value?.toString() || "")
    .toLowerCase()
    .includes("false");
};
/**
 * Sanitizes a Quill Delta object.
 * @param delta The Quill Delta object to sanitize.
 * @returns The sanitized Quill Delta object.
 */
const sanitizeDelta = (delta?: TTextBlock[]): TTextBlock[] => {
  if (!delta) return [];
  return delta.map((block) => {
    const insert = sanitizeUtil.sanitizedObjectField(block.insert) || "";
    const attributes: TQuillAttributes = {};

    if (block.attributes) {
      for (const key in block.attributes) {
        if (!ALLOWED_ATTRIBUTES.has(key)) continue;

        switch (key) {
          case "size":
            attributes.size =
              (sanitizeUtil.sanitizedObjectField(
                block.attributes[key]
              ) as TQuillTextSize) || undefined;
            break;
          case "underline":
          case "italic":
          case "bold":
            attributes[key] = sanitizeUtil.sanitizedBoolean(
              block.attributes[key]
            );
            break;
          case "link":
            attributes.link = sanitizeUtil.sanitizedObjectField(
              block.attributes[key]
            );
            break;
          case "color":
            attributes.color = sanitizeUtil.sanitizedObjectField(
              block.attributes[key]
            );
            break;
        }
      }
    }

    return { insert, attributes };
  });
};

export const sanitizeUtil = {
  sanitizedFormField,
  sanitizedObjectField,
  sanitizedBoolean,
  sanitizeDelta,
};
