//Utils
import { sanitizeUtil } from "./sanitize.util";
import { validationUtil } from "../validation.util";
import { AppError } from "./Error.util";
//Types
import { FAQ_TYPE, TFaqDto, TFaqType } from "@/types/faqs";
import { isValidObjectId } from "@/lib/mongoClient";

const sanitizeFaqDto = (dto: TFaqDto): TFaqDto => {
  const deltaAnswer = sanitizeUtil.sanitizeDelta(dto?.deltaAnswer) || [];
  const deltaQuestion = sanitizeUtil.sanitizeDelta(dto?.deltaQuestion) || [];
  const faqType = (sanitizeUtil.sanitizedObjectField(dto?.faqType) ||
    "students") as TFaqType;

  return {
    deltaAnswer,
    deltaQuestion,
    faqType,
    _id: dto?._id,
  };
};

const validateFaqDto = (dto: TFaqDto): Record<keyof TFaqDto, string> => {
  const errors: Record<string, string> = {};

  validationUtil.validateDelta(errors, dto.deltaAnswer, "deltaAnswer");
  validationUtil.validateDelta(errors, dto.deltaQuestion, "deltaQuestion");

  if (dto?._id) {
    const isValid = isValidObjectId(dto._id);
    if (!isValid) errors._id = "Invalid ID";
  }

  const faqTypeError = validationUtil.compareStr<TFaqType>(
    "faqType",
    dto?.faqType,
    FAQ_TYPE
  );
  if (faqTypeError) errors.faqType = faqTypeError;

  if (Object.keys(errors).length > 0) {
    throw AppError.create("Validation Error", 400, true, errors);
  }

  return errors;
};

const fromDataToDto = (formData: FormData): TFaqDto => {
  const deltaQuestionRaw = formData.get("deltaQuestion");
  let deltaQuestion = [];
  if (deltaQuestionRaw) {
    try {
      deltaQuestion = JSON.parse(deltaQuestionRaw as string);
    } catch (error) {
      throw AppError.create(
        `Unexpected Error parsing Quill Delta -> ${error}`,
        500,
        true
      );
    }
  }
  const deltaAnswerRaw = formData.get("deltaAnswer");
  let deltaAnswer = [];
  if (deltaQuestionRaw) {
    try {
      deltaAnswer = JSON.parse(deltaAnswerRaw as string);
    } catch (error) {
      throw AppError.create(
        `Unexpected Error parsing Quill Delta -> ${error}`,
        500,
        true
      );
    }
  }
  const _id = formData.get("_id") as string;
  const faqType = formData.get("faqType") as TFaqType;

  return {
    deltaQuestion,
    deltaAnswer,
    _id,
    faqType,
  };
};

const getEmpty = (): TFaqDto => {
  return {
    deltaAnswer: [{ insert: "תשובה" }],
    deltaQuestion: [{ insert: "שאלה" }],
    _id: "",
  };
};
export const faqServerUtils = {
  fromDataToDto,
  getEmpty,
  sanitizeFaqDto,
  validateFaqDto,
};
