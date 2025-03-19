//Utils
import { sanitizeUtil } from "./sanitize.util";
import { validationUtil } from "../validation.util";
import { AppError } from "./Error.util";
//Types
import { TArticleDto } from "@/types/articles.type";

const sanitizeArticleDtoCreate = (dto: TArticleDto): TArticleDto => {
  const preview = sanitizeUtil.sanitizedObjectField(dto?.preview) || "";
  const link = sanitizeUtil.sanitizedObjectField(dto?.link) || "";
  const publishDate = sanitizeUtil.sanitizedObjectField(dto?.publishDate) || "";
  const publishPlace =
    sanitizeUtil.sanitizedObjectField(dto?.publishPlace) || "";
  const createBy = sanitizeUtil.sanitizedObjectField(dto?.createBy) || "";

  return {
    link,
    preview,
    publishDate,
    publishPlace,
    createBy,
  };
};
const validateArticleDtoCreate = (
  dto: TArticleDto
): Record<keyof TArticleDto, string> => {
  const errors: Record<string, string> = {};

  const linkError = validationUtil.validateExistence("imgPath", dto?.link);
  if (linkError) errors.link = linkError;

  const linkErrorLength = validationUtil.validateStrLength(
    "link",
    2,
    dto?.link
  );
  if (linkErrorLength) errors.link = linkErrorLength;

  const publishPlaceError = validationUtil.validateExistence(
    "publishPlace",
    dto?.publishPlace
  );
  if (publishPlaceError) errors.publishPlace = publishPlaceError;

  const publishPlaceErrorLength = validationUtil.validateStrLength(
    "publishPlace",
    2,
    dto?.publishPlace
  );
  if (publishPlaceErrorLength) errors.publishPlace = publishPlaceErrorLength;
  const publishDateError = validationUtil.validateExistence(
    "publishDate",
    dto?.publishDate
  );
  if (publishDateError) errors.publishDate = publishDateError;

  const publishDateErrorLength = validationUtil.validateStrLength(
    "publishDate",
    2,
    dto?.publishDate
  );
  if (publishDateErrorLength) errors.publishDate = publishDateErrorLength;

  const previewError = validationUtil.validateExistence(
    "preview",
    dto?.preview
  );
  if (previewError) errors.preview = previewError;
  const previewErrorLength = validationUtil.validateStrLength(
    "preview",
    2,
    dto?.preview
  );

  if (previewErrorLength) errors.preview = previewErrorLength;

  const createByError = validationUtil.validateExistence(
    "createBy",
    dto?.createBy
  );
  if (createByError) errors.createBy = createByError;

  if (Object.keys(errors).length > 0) {
    throw AppError.create("Validation Error", 400, true, errors);
  }
  return errors;
};
const sanitizeArticleDtoUpdate = (dto: TArticleDto): TArticleDto => {
  const updateBy = sanitizeUtil.sanitizedObjectField(dto?.updateBy) || "";
  const _id = sanitizeUtil.sanitizedObjectField(dto?._id) || "";

  return {
    ...sanitizeArticleDtoCreate(dto),
    updateBy,
    _id,
  };
};
const validateArticleDtoUpdate = (
  dto: TArticleDto
): Record<keyof TArticleDto, string> => {
  const errors: Record<string, string> = {};

  validateArticleDtoCreate(dto);

  const updateByError = validationUtil.validateExistence(
    "updateBy",
    dto?.updateBy
  );

  if (updateByError) errors.updateBy = updateByError;

  const _idError = validationUtil.validateExistence("_id", dto?._id);

  if (_idError) errors._id = _idError;

  if (Object.keys(errors).length > 0) {
    throw AppError.create("Validation Error", 400, true, errors);
  }
  return errors;
};
const fromDataToDto = (formData: FormData): TArticleDto => {
  const publishDate = formData.get("publishDate") as string;
  const link = formData.get("link") as string;
  const _id = formData.get("_id") as string;
  const createBy = formData.get("createBy") as string;
  const updateBy = formData.get("updateBy") as string;
  const preview = formData.get("preview") as string;
  const publishPlace = formData.get("publishPlace") as string;

  return {
    publishDate,
    link,
    _id,
    preview,
    createBy,
    updateBy,
    publishPlace,
  };
};
const getEmpty = (): TArticleDto => {
  return {
    publishPlace: "",
    publishDate: "",
    link: "",
    _id: "",
    preview: "",
    createBy: "",
    updateBy: "",
  };
};
export const ArticlesServerUtils = {
  sanitizeArticleDtoCreate,
  validateArticleDtoCreate,
  sanitizeArticleDtoUpdate,
  validateArticleDtoUpdate,
  fromDataToDto,
  getEmpty,
};
