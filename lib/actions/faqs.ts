"use server";
//Next
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
//DB
import { ObjectId } from "mongodb";
import { getCollection, isValidObjectId } from "@/lib/mongoClient";
//Types
import { TFaq, TFaqDocument, TFaqDto, TFaqFilter } from "@/types/faqs";
import { TFormState } from "@/types/app.type";
//Utils
import { AppError } from "@/utils/server/Error.util";
import { authServerUtils } from "@/utils/server/auth.util";
import { faqServerUtils } from "@/utils/server/faq.util";
/**
 * Creates a new FAQ entry in the database.
 *
 * @param prevState - The previous state of the form containing FAQ data.
 * @param formData - The form data containing the FAQ details.
 * @returns A promise that resolves to the updated form state.
 * @throws Will throw an error if the user is not authenticated or if the FAQ creation fails.
 */
export async function createFaq(
  prevState: TFormState<TFaqDto>,
  formData: FormData
): Promise<TFormState<TFaqDto>> {
  let dto;
  try {
    await authServerUtils.verifyAuth();

    const data = faqServerUtils.fromDataToDto(formData);

    dto = faqServerUtils.sanitizeFaqDto(data);

    faqServerUtils.validateFaqDto(dto);
    const { deltaAnswer, deltaQuestion, faqType } = dto;

    const collection = await getCollection<TFaqDocument>("faqs");
    const { acknowledged, insertedId } = await collection.insertOne({
      deltaAnswer,
      deltaQuestion,
      faqType,
    });

    if (!acknowledged || !insertedId) {
      throw AppError.create("תקלת מערכת ביצרת שאלה חדשה צור קשר עם תמיכה");
    }

    revalidatePath("/admin/faqs");
    revalidatePath(`/faqs/${faqType}`);
  } catch (error) {
    const err = AppError.handleResponse(error);
    return {
      errors: err.errors as Record<keyof TFaqDto, string>,
      message: err.message,
      data: dto,
    };
  }

  redirect("/admin/faqs");
}
/**
 * Updates an FAQ entry in the database.
 *
 * @param prevState - The previous state of the form containing the FAQ data.
 * @param formData - The form data containing the updated FAQ information.
 * @returns A promise that resolves to the updated form state.
 *
 * @throws Will throw an error if the FAQ update fails.
 */
export async function updateFaq(
  prevState: TFormState<TFaqDto>,
  formData: FormData
): Promise<TFormState<TFaqDto>> {
  let dto;
  try {
    await authServerUtils.verifyAuth();

    const data = faqServerUtils.fromDataToDto(formData);

    dto = faqServerUtils.sanitizeFaqDto(data);

    faqServerUtils.validateFaqDto(dto);

    const { deltaAnswer, deltaQuestion, faqType, _id } = dto;

    const collection = await getCollection<TFaqDocument>("faqs");
    const { modifiedCount } = await collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          deltaAnswer,
          deltaQuestion,
          faqType,
          updateDate: new Date(),
        },
      }
    );

    if (!modifiedCount) {
      throw AppError.create("תקלת מערכת בעדכון שאלה, צור קשר עם התמיכה");
    }

    revalidatePath("/admin/faqs");
    revalidatePath(`/faqs/${faqType}`);
  } catch (error) {
    const err = AppError.handleResponse(error);
    return {
      errors: err.errors as Record<keyof TFaqDto, string>,
      message: err.message,
      data: dto,
    };
  }
  redirect("/admin/faqs");
}
/**
 * Retrieves FAQs based on the provided filter criteria.
 *
 * @param {TFaqFilter} filter - The filter criteria for retrieving FAQs.
 * @param {string} [filter.faqType] - The type of FAQ to filter by.
 * @param {string} [filter._id] - The ID of the FAQ to filter by.
 * @param {boolean} [filter.isFull=false] - Whether to include full details including user information.
 * @returns {Promise<TFaq[]>} A promise that resolves to an array of FAQs.
 * @throws Will throw an error if the retrieval process fails.
 */
export async function getFaqs(filter: TFaqFilter): Promise<TFaq[]> {
  try {
    const pipeline = [];

    const { faqType, _id, isFull = false } = filter;

    if (faqType) {
      pipeline.push({ $match: { faqType } });
    }

    if (_id && isValidObjectId(_id)) {
      pipeline.push({ $match: { _id: new ObjectId(_id) } });
    }

    if (isFull) {
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          deltaQuestion: 1,
          deltaAnswer: 1,
          createAt: {
            $dateToString: {
              date: { $toDate: "$_id" },
              format: "%Y-%m-%d %H:%M:%S",
            },
          },
          faqType: 1,
          updateAt: 1,
        },
      });
    } else {
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          deltaQuestion: 1,
          deltaAnswer: 1,
          faqType: 1,
        },
      });
    }
    const collection = await getCollection<TFaqDocument>("faqs");
    return (await collection.aggregate(pipeline).toArray()) || [];
  } catch (error) {
    AppError.create(`תקלת מערכת בקבלת שאלות, צור קשר עם התמיכה -> ${error}`);
    return [];
  }
}
/**
 * Retrieves a FAQ document by its ID and returns it in a DTO format.
 *
 * @param {string} id - The ID of the FAQ document to retrieve.
 * @returns {Promise<TFaqDto>} - A promise that resolves to the FAQ DTO.
 * @throws {AppError} - Throws an error if the FAQ is not found or if there is a failure in retrieving the FAQ.
 */
export async function getFaqToEdit(id: string): Promise<TFaqDto> {
  try {
    await authServerUtils.verifyAuth();

    const collection = await getCollection<TFaqDocument>("faqs");
    const pipeline = [];
    pipeline.push({ $match: { _id: new ObjectId(id) } });
    pipeline.push({
      $project: {
        _id: { $toString: "$_id" },
        question: 1,
        answer: 1,
        faqType: 1,
        createBy: {
          $toString: "$createBy",
        },
        updatedBy: {
          $toString: "$createBy",
        },
        createdAt: {
          $dateToString: {
            date: { $toDate: "$_id" },
            format: "%Y-%m-%d %H:%M:%S",
          },
        },
        updateAt: 1,
      },
    });
    const dto = await collection.aggregate<TFaqDto>(pipeline).next();
    if (!dto) {
      throw AppError.create("FAQ not found");
    }

    return dto;
  } catch (error) {
    throw AppError.create(`Failed to get FAQ by ID -> ${error}`);
  }
}
/**
 * Deletes a FAQ document from the database.
 *
 * @param {string} id - The ID of the FAQ document to delete.
 * @param {string} [type] - The type of the FAQ document, used for revalidation.
 * @throws {AppError} If the FAQ deletion fails or if authentication fails.
 * @returns {Promise<void>} A promise that resolves when the FAQ is deleted and paths are revalidated.
 */
export async function deleteFaq(id: string, type?: string): Promise<void> {
  try {
    await authServerUtils.verifyAuth();

    const collection = await getCollection<TFaqDocument>("faqs");
    const { acknowledged } = await collection.deleteOne({
      _id: new ObjectId(id),
    });
    if (!acknowledged) {
      throw AppError.create("Failed to delete FAQ");
    }
  } catch (error) {
    throw AppError.create(`Failed to delete FAQ -> ${error}`);
  }
  revalidatePath("/admin/faqs");
  revalidatePath(`/faqs/${type}`);
}
