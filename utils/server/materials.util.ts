//Utils
import { sanitizeUtil } from "./sanitize.util";
import { validationUtil } from "../validation.util";
import { AppError } from "./Error.util";
//Types
import { TMaterialDto } from "@/types/materials.type";

const sanitizeMaterialsDtoCreate = (dto: TMaterialDto): TMaterialDto => {
  const link = sanitizeUtil.sanitizedObjectField(dto?.link) || "";
  const subject = sanitizeUtil.sanitizedObjectField(dto?.subject) || "";

  return {
    link,
    subject,
  };
};
const validateMaterialsDtoCreate = (
  dto: TMaterialDto
): Record<keyof TMaterialDto, string> => {
  const errors: Record<string, string> = {};



  const linkErrorLength = validationUtil.validateStrLength(
    "link",
    2,
    dto?.link
  );
  if (linkErrorLength) errors.link = linkErrorLength;

  const subjectError = validationUtil.validateExistence(
    "subject",
    dto?.subject
  );
  if (subjectError) errors.subject = subjectError;
  const subjectErrorLength = validationUtil.validateStrLength(
    "subject",
    2,
    dto?.subject
  );

  if (subjectErrorLength) errors.subject = subjectErrorLength;

 

  if (Object.keys(errors).length > 0) {
    throw AppError.create("Validation Error", 400, true, errors);
  }
  return errors;
};

const sanitizeMaterialsDtoUpdate = (dto: TMaterialDto): TMaterialDto => {
  const _id = sanitizeUtil.sanitizedObjectField(dto?._id) || "";

  return {
    ...sanitizeMaterialsDtoCreate(dto),
    _id,
  };
};

const validateMaterialsDtoUpdate = (
  dto: TMaterialDto
): Record<keyof TMaterialDto, string> => {
  const errors: Record<string, string> = {};

  validateMaterialsDtoCreate(dto);

 

  const _idError = validationUtil.validateExistence("_id", dto?._id);

  if (_idError) errors._id = _idError;

  if (Object.keys(errors).length > 0) {
    throw AppError.create("Validation Error", 400, true, errors);
  }
  return errors;
};

const fromDataToDto = (
  formData: FormData
): { data: TMaterialDto; imgFile: File } => {
  const imgFile = formData.get("imgFile") as File;
  const link = formData.get("link") as string;
  const _id = formData.get("_id") as string;
  const subject = formData.get("subject") as string;

  return {
    data: {
      link,
      _id,
      subject,
    },
    imgFile,
  };
};

const getEmpty = (): TMaterialDto => {
  return {
    imgPath: "",
    link: "",
    _id: "",
    subject: "",
  };
};
export const materialsServerUtils = {
  sanitizeMaterialsDtoCreate,
  validateMaterialsDtoCreate,
  sanitizeMaterialsDtoUpdate,
  validateMaterialsDtoUpdate,
  fromDataToDto,
  getEmpty,
};
