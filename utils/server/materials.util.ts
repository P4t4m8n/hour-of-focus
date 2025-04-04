//Utils
import { sanitizeUtil } from "./sanitize.util";
import { validationUtil } from "../validation.util";
import { AppError } from "./Error.util";
import { isValidObjectId } from "@/lib/mongoClient";
//Types
import { TMaterialDto } from "@/types/materials.type";

/**
 * Sanitizes the properties of a TMaterialDto object by ensuring that each field
 * is processed through a sanitization utility and defaults to an empty string
 * if the field is undefined or null.
 *
 * @param dto - The TMaterialDto object to sanitize.
 * @returns A sanitized TMaterialDto object with sanitized `link`, `subject`, and `_id` fields.
 */
const sanitizeMaterialsDto = (dto: TMaterialDto): TMaterialDto => {
  const link = sanitizeUtil.sanitizedObjectField(dto?.link) || "";
  const subject = sanitizeUtil.sanitizedObjectField(dto?.subject) || "";
  const _id = sanitizeUtil.sanitizedObjectField(dto?._id) || "";
  const imgPath = sanitizeUtil.sanitizedObjectField(dto?.imgPath) || "";
  const public_id = sanitizeUtil.sanitizedObjectField(dto?.public_id) || "";

  return {
    link,
    subject,
    _id,
    imgPath,
    public_id,
  };
};
/**
 * Validates the properties of a TMaterialDto object by ensuring that each field
 * is processed through a validation utility and throws an AppError if any of the
 * fields are invalid.
 *
 * @param dto - The TMaterialDto object to validate.
 * @returns An object containing the validation errors for the `link`, `subject`, and `_id` fields.
 * @throws AppError if any of the fields are invalid.
 */
const validateMaterialsDto = (
  dto: TMaterialDto
): Record<keyof TMaterialDto, string> => {
  const errors: Record<string, string> = {};

  const linkErrorLength = validationUtil.validateUrl(
    "קישור",

    dto?.link
  );
  if (linkErrorLength) errors.link = linkErrorLength;

  const subjectErrorLength = validationUtil.validateStrLength(
    "נושא",
    2,
    dto?.subject
  );

  if (subjectErrorLength) errors.subject = subjectErrorLength;

  if (dto?._id) {
    const isValid = isValidObjectId(dto._id);
    if (!isValid) errors._id = " מזהה לא חוקי";
  }

  if (Object.keys(errors).length > 0) {
    throw AppError.create("", 400, true, errors);
  }
  return errors;
};
/**
 * Converts a FormData object into a TMaterialDto object by extracting the `link`, `subject`, and `_id` fields
 * from the FormData object and returning a new object with those fields.
 *
 * @param formData - The FormData object to convert.
 * @returns An object containing the `link`, `subject`, and `_id` fields from the FormData object.
 */
const fromDataToDto = (
  formData: FormData
): { data: TMaterialDto; imgFile: File } => {
  const imgFile = formData.get("imgFile") as File;
  const link = formData.get("link") as string;
  const _id = formData.get("_id") as string;
  const subject = formData.get("subject") as string;
  const imgPath = formData.get("imgPath") as string;
  const public_id = formData.get("public_id") as string;

  return {
    data: {
      link,
      _id,
      subject,
      imgPath,
      public_id,
    },
    imgFile,
  };
};
/**
 * Returns an empty TMaterialDto object with all fields set to empty strings.
 *
 * @returns An empty TMaterialDto object with all fields set to empty strings.
 */
const getEmpty = (): TMaterialDto => {
  return {
    imgPath: "",
    link: "",
    _id: "",
    subject: "",
  };
};
export const materialsServerUtils = {
  sanitizeMaterialsDto,
  validateMaterialsDto,
  fromDataToDto,
  getEmpty,
};
