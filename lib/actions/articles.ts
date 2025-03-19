"use server";
//Next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
//DB
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongoClient";
//Types
import { TFormState } from "@/types/app.type";
import { TArticle, TArticleDocument, TArticleDto } from "@/types/articles.type";
//Utils
import { AppError } from "@/utils/server/Error.util";
import { authServerUtils } from "@/utils/server/auth.util";
import { ArticlesServerUtils } from "@/utils/server/articles.util";
/**
 * Creates a new article based on the provided form data and updates the state.
 *
 * @param prevState - The previous state of the form containing article data.
 * @param formData - The form data containing the new article information.
 * @returns A promise that resolves to the updated form state.
 *
 * @throws Will throw an error if the article creation fails.
 */
export async function createArticle(
  prevState: TFormState<TArticleDto>,
  formData: FormData
): Promise<TFormState<TArticleDto>> {
  let dto;
  try {
    const userId = await authServerUtils.verifyAuth();

    const data = ArticlesServerUtils.fromDataToDto(formData);

    dto = ArticlesServerUtils.sanitizeArticleDtoCreate({
      ...data,
      createBy: userId,
    });

    ArticlesServerUtils.validateArticleDtoCreate(dto);
    const { createBy, publishDate, link, preview, publishPlace } = dto;

    const collection = await getCollection<TArticleDocument>("articles");
    const { acknowledged, insertedId } = await collection.insertOne({
      preview,
      link,
      publishPlace,
      publishDate,
      createBy: new ObjectId(createBy),
    });

    if (!acknowledged || !insertedId) {
      throw AppError.create("Failed to create Article");
    }

    revalidatePath("/admin/articles");
    revalidatePath(`/`);
  } catch (error) {
    const err = AppError.handleResponse(error);
    return {
      errors: err.errors as Record<keyof TArticleDto, string>,
      message: err.message,
      data: dto,
    };
  }
  redirect("/admin/articles");
}
/**
 * Updates an article with the provided form data.
 *
 * @param {TFormState<TArticleDto>} prevState - The previous state of the form.
 * @param {FormData} formData - The form data containing the updated article information.
 * @returns {Promise<TFormState<TArticleDto>>} - The updated form state.
 *
 * @throws {AppError} - Throws an error if the article update fails.
 *
 * The function performs the following steps:
 * 1. Verifies the user's authentication.
 * 2. Converts the form data to a DTO (Data Transfer Object).
 * 3. Sanitizes and validates the DTO.
 * 4. Updates the article in the database.
 * 5. Revalidates the necessary paths.
 * 6. Redirects to the articles admin page.
 *
 * If an error occurs during the process, it handles the error and returns the form state with the error messages.
 */
export async function updateArticle(
  prevState: TFormState<TArticleDto>,
  formData: FormData
): Promise<TFormState<TArticleDto>> {
  let dto;
  try {
    const userId = await authServerUtils.verifyAuth();

    const data = ArticlesServerUtils.fromDataToDto(formData);

    dto = ArticlesServerUtils.sanitizeArticleDtoUpdate({
      ...data,
      updateBy: userId,
    });

    ArticlesServerUtils.validateArticleDtoUpdate(dto);
    const {
      createBy,
      publishDate,
      link,
      preview,
      publishPlace,
      _id,
      updateBy,
    } = dto;

    const collection = await getCollection<TArticleDocument>("articles");
    const { modifiedCount } = await collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          preview,
          link,
          publishPlace,
          publishDate,
          _id: new ObjectId(_id),
          updateBy: new ObjectId(updateBy),
          createBy: new ObjectId(createBy),
          updateDate: new Date(),
        },
      }
    );

    if (!modifiedCount) {
      throw AppError.create("Failed to update Article");
    }

    revalidatePath("/admin/articles");
    revalidatePath(`/`);
  } catch (error) {
    const err = AppError.handleResponse(error);
    return {
      errors: err.errors as Record<keyof TArticleDto, string>,
      message: err.message,
      data: dto,
    };
  }

  redirect("/admin/articles");
}
/**
 * Fetches articles from the database with optional full details.
 *
 * @param {boolean} [isFull] - If true, fetches full details of the articles including user information.
 * @returns {Promise<TArticle[]>} - A promise that resolves to an array of articles.
 *
 * @throws Will throw an error if the database query fails.
 *
 * The function constructs an aggregation pipeline based on the `isFull` parameter.
 * If `isFull` is true, it includes additional lookup stages to fetch user details
 * for the `createBy` and `updateBy` fields, and formats the output accordingly.
 * If `isFull` is false, it only projects basic article fields.
 */
export async function getArticles(isFull?: boolean): Promise<TArticle[]> {
  try {
    const pipeline = [];

    if (isFull) {
      pipeline.push({
        $lookup: {
          from: "users",
          localField: "createBy",
          foreignField: "_id",
          as: "createBy",
        },
      });

      pipeline.push({
        $unwind: {
          path: "$createBy",
          preserveNullAndEmptyArrays: true,
        },
      });

      pipeline.push({
        $lookup: {
          from: "users",
          localField: "updateBy",
          foreignField: "_id",
          as: "updateBy",
        },
      });

      pipeline.push({
        $unwind: {
          path: "$updateBy",
          preserveNullAndEmptyArrays: true,
        },
      });

      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          preview: 1,
          link: 1,
          publishPlace: 1,
          publishDate: 1,
          createBy: {
            _id: { $toString: "$createBy._id" },
            username: 1,
          },
          updateBy: {
            _id: { $toString: "$createBy._id" },
            username: 1,
          },
          createAt: {
            $dateToString: {
              date: { $toDate: "$_id" },
              format: "%Y-%m-%d %H:%M:%S",
            },
          },
          updateAt: {
            $dateToString: {
              date: { $toDate: "$updateAt" },
              format: "%Y-%m-%d %H:%M:%S",
            },
          },
        },
      });
    } else {
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          preview: 1,
          link: 1,
          publishPlace: 1,
          publishDate: 1,
        },
      });
    }

    const collection = await getCollection<TArticleDocument>("articles");
    const articles = await collection.aggregate<TArticle>(pipeline).toArray();
    return articles || [];
  } catch (error) {
    AppError.create(`Failed to get Articles -> ${error}`);
    return [];
  }
}
/**
 * Retrieves an article by its ID from the database.
 *
 * @param {string} id - The ID of the article to retrieve.
 * @returns {Promise<TArticleDto>} A promise that resolves to the article data transfer object (DTO).
 * @throws {AppError} If the article is not found or if there is an error during retrieval.
 *
 * The function performs the following operations:
 * - Matches the article by its ID.
 * - Looks up the user who created the article.
 * - Unwinds the createBy field to handle arrays.
 * - Looks up the user who updated the article.
 * - Unwinds the updatedBy field to handle arrays.
 * - Projects the necessary fields for the article DTO.
 */
export async function getArticle(id: string): Promise<TArticleDto> {
  try {
    await authServerUtils.verifyAuth();

    const collection = await getCollection<TArticleDocument>("articles");
    const pipeline = [];
    pipeline.push({ $match: { _id: new ObjectId(id) } });
    pipeline.push({
      $lookup: {
        from: "users",
        localField: "createBy",
        foreignField: "_id",
        as: "createBy",
      },
    });

    pipeline.push({
      $unwind: {
        path: "$createBy",
        preserveNullAndEmptyArrays: true,
      },
    });

    pipeline.push({
      $lookup: {
        from: "users",
        localField: "updatedBy",
        foreignField: "_id",
        as: "updatedBy",
      },
    });

    pipeline.push({
      $unwind: {
        path: "$updatedBy",
        preserveNullAndEmptyArrays: true,
      },
    });

    pipeline.push({
      $project: {
        _id: { $toString: "$_id" },
        preview: 1,
        link: 1,
        publishPlace: 1,
        publishDate: {
          $dateToString: {
            date: { $toDate: "$publishDate" },
            format: "%Y-%m-%d %H:%M:%S",
          },
        },
        createBy: {
          _id: { $toString: "$createBy._id" },
          username: 1,
        },
        updatedBy: {
          _id: { $toString: "$createBy._id" },
          username: 1,
        },
        createdAt: {
          $dateToString: {
            date: { $toDate: "$_id" },
            format: "%Y-%m-%d %H:%M:%S",
          },
        },
        updateAt: {
          $dateToString: {
            date: { $toDate: "$updateAt" },
            format: "%Y-%m-%d %H:%M:%S",
          },
        },
      },
    });
    const dto = await collection.aggregate<TArticleDto>(pipeline).next();

    if (!dto) {
      throw AppError.create("Article not found");
    }

    return dto;
  } catch (error) {
    throw AppError.create(`Failed to get Article by ID -> ${error}`);
  }
}
/**
 * Deletes an article by its ID.
 *
 * @param {string} id - The ID of the article to delete.
 * @returns {Promise<void>} - A promise that resolves when the article is deleted.
 * @throws {AppError} - Throws an error if the deletion fails.
 */
export async function deleteArticle(id: string): Promise<void> {
  try {
    await authServerUtils.verifyAuth();

    const collection = await getCollection<TArticleDocument>("articles");
    const { acknowledged } = await collection.deleteOne({
      _id: new ObjectId(id),
    });
    if (!acknowledged) {
      throw AppError.create("Failed to delete Article");
    }

    revalidatePath("/admin/articles");
    revalidatePath(`/`);
  } catch (error) {
    throw AppError.create(`Failed to delete Article -> ${error}`);
  }
}
