"use server";
//Next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
//DB
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongoClient";
//Types
import { TFormState } from "@/types/app.type";
import {
  TTestimony,
  TTestimonyDocument,
  TTestimonyDto,
} from "@/types/testimonies.type";
//Utils
import { AppError } from "@/utils/server/Error.util";
import { authServerUtils } from "@/utils/server/auth.util";
import { TestimoniesServerUtils } from "@/utils/server/testimonies.util";
/**
 * Creates a new testimony based on the provided form data and updates the state.
 *
 * @param {TFormState<TTestimonyDto>} prevState - The previous state of the form.
 * @param {FormData} formData - The form data containing the testimony details.
 * @returns {Promise<TFormState<TTestimonyDto>>} - The updated form state.
 *
 * @throws {AppError} - Throws an error if the testimony creation fails.
 */
export async function createTestimony(
  prevState: TFormState<TTestimonyDto>,
  formData: FormData
): Promise<TFormState<TTestimonyDto>> {
  let dto;
  try {
    await authServerUtils.verifyAuth();

    const data = TestimoniesServerUtils.fromDataToDto(formData);

    dto = TestimoniesServerUtils.sanitizeTestimonyDto(data);

    TestimoniesServerUtils.validateTestimonyDto(dto);
    const { delta } = dto;

    const collection = await getCollection<TTestimonyDocument>("testimonies");
    const { acknowledged, insertedId } = await collection.insertOne({
      delta,
    });

    if (!acknowledged || !insertedId) {
      throw AppError.create("Failed to create Testimony");
    }

    revalidatePath("/admin/testimonies");
    revalidatePath(`/`);
  } catch (error) {
    const err = AppError.handleResponse(error);

    return {
      errors: err.errors as Record<keyof TTestimonyDto, string>,
      message: err.message,
      data: dto,
    };
  }

  redirect("/admin/testimonies");
}
/**
 * Updates a testimony with the provided form data.
 *
 * @param prevState - The previous state of the testimony form.
 * @param formData - The form data containing the updated testimony information.
 * @returns A promise that resolves to the updated state of the testimony form.
 * @throws Will throw an error if the testimony update fails.
 */
export async function updateTestimony(
  prevState: TFormState<TTestimonyDto>,
  formData: FormData
): Promise<TFormState<TTestimonyDto>> {
  let dto;
  try {
    await authServerUtils.verifyAuth();

    const data = TestimoniesServerUtils.fromDataToDto(formData);

    dto = TestimoniesServerUtils.sanitizeTestimonyDto(data);

    TestimoniesServerUtils.validateTestimonyDto(dto);
    const { delta, _id } = dto;

    const collection = await getCollection<TTestimonyDocument>("testimonies");
    const { modifiedCount } = await collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          delta,
          _id: new ObjectId(_id),
          updateDate: new Date(),
        },
      }
    );

    if (!modifiedCount) {
      throw AppError.create("Failed to update Testimony");
    }

    revalidatePath("/admin/testimonies");
    revalidatePath(`/`);
  } catch (error) {
    const err = AppError.handleResponse(error);
    return {
      errors: err.errors as Record<keyof TTestimonyDto, string>,
      message: err.message,
      data: dto,
    };
  }
  redirect("/admin/testimonies");
}
/**
 * Retrieves testimonies from the database.
 *
 * @param {boolean} [isFull] - If true, retrieves full testimonies with user details.
 * @returns {Promise<TTestimony[]>} - A promise that resolves to an array of testimonies.
 *
 * @throws {AppError} - Throws an error if the testimonies cannot be retrieved.
 *
 * The function constructs an aggregation pipeline based on the `isFull` parameter.
 * If `isFull` is true, it performs lookups to include user details for `createBy` and `updatedBy` fields,
 * unwinds the results, and projects the necessary fields including formatted dates.
 * If `isFull` is false, it only projects the `_id` and `text` fields.
 *
 * The function then retrieves the `testimonies` collection and performs the aggregation.
 */
export async function getTestimonies(isFull?: boolean): Promise<TTestimony[]> {
  try {
    const pipeline = [];

    if (isFull) {
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          delta: 1,
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
          delta: 1,
        },
      });
    }

    const collection = await getCollection<TTestimonyDocument>("testimonies");
    return (await collection.aggregate<TTestimony>(pipeline).toArray()) || [];
  } catch (error) {
    AppError.create(`Failed to get Testimony -> ${error}`);
    return [];
  }
}
/**
 * Retrieves a testimony document by its ID.
 *
 * @param {string} id - The ID of the testimony to retrieve.
 * @returns {Promise<TTestimonyDocument>} A promise that resolves to the testimony document.
 * @throws {AppError} If the testimony is not found or if there is an error during retrieval.
 *
 * The function performs the following steps:
 * 1. Retrieves the "testimonies" collection.
 * 2. Constructs an aggregation pipeline to:
 *    - Match the testimony by its ID.
 *    - Lookup and unwind the `createBy` and `updatedBy` fields from the "users" collection.
 *    - Project the necessary fields, converting IDs to strings and formatting dates.
 * 3. Executes the aggregation pipeline and retrieves the testimony document.
 * 4. Throws an error if the testimony is not found or if there is an error during retrieval.
 */
export async function getTestimony(id: string): Promise<TTestimonyDocument> {
  try {
    await authServerUtils.verifyAuth();

    const collection = await getCollection<TTestimonyDocument>("testimonies");
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
        text: 1,
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
    const dto = await collection.aggregate<TTestimonyDocument>(pipeline).next();

    if (!dto) {
      throw AppError.create("Testimony not found");
    }

    return dto;
  } catch (error) {
    throw AppError.create(`Failed to get Testimony by ID -> ${error}`);
  }
}
/**
 * Deletes a testimony from the database by its ID.
 *
 * @param {string} id - The ID of the testimony to delete.
 * @returns {Promise<void>} - A promise that resolves when the testimony is deleted.
 * @throws {AppError} - Throws an error if the deletion fails.
 */
export async function deleteTestimony(id: string): Promise<void> {
  try {
    await authServerUtils.verifyAuth();

    const collection = await getCollection<TTestimonyDocument>("testimonies");
    const { acknowledged } = await collection.deleteOne({
      _id: new ObjectId(id),
    });
    if (!acknowledged) {
      throw AppError.create("Failed to delete Testimony");
    }

    revalidatePath("/admin/testimonies");
    revalidatePath(`/`);
  } catch (error) {
    throw AppError.create(`Failed to delete Testimony -> ${error}`);
  }
}
