"use server";
//Next
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
//DB
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongoClient";
//Types
import { TFormState } from "@/types/app.type";
import {
  TMaterial,
  TMaterialDocument,
  TMaterialDto,
  TMaterialFilter,
} from "@/types/materials.type";
//Utils
import { materialsServerUtils } from "@/utils/server/materials.util";
import { AppError } from "@/utils/server/Error.util";
import { authServerUtils } from "@/utils/server/auth.util";
import { imageUpload } from "../imageUpload";
/**
 * Creates a new material and updates the state with the result.
 *
 * @param prevState - The previous state of the form.
 * @param formData - The form data containing material information.
 * @returns A promise that resolves to the updated form state.
 * @throws Will throw an error if the material creation fails.
 */
export async function createMaterial(
  prevState: TFormState<TMaterialDto>,
  formData: FormData
): Promise<TFormState<TMaterialDto>> {
  let dto;
  try {
    await authServerUtils.verifyAuth();

    const { data, imgFile } = materialsServerUtils.fromDataToDto(formData);

    dto = materialsServerUtils.sanitizeMaterialsDtoCreate({
      ...data,
    });

    materialsServerUtils.validateMaterialsDtoCreate(dto);
    const { link, subject } = dto;

    const imgPath = await imageUpload.uploadToCdn(imgFile);

    const collection = await getCollection<TMaterialDocument>("materials");
    const { acknowledged, insertedId } = await collection.insertOne({
      subject,
      link,
      imgPath,
    });

    if (!acknowledged || !insertedId) {
      throw AppError.create("Failed to create Material");
    }

    revalidatePath("/admin/materials");
    revalidatePath(`/materials`);
  } catch (error) {
    const err = AppError.handleResponse(error);
    return {
      errors: err.errors as Record<keyof TMaterialDto, string>,
      message: err.message,
      data: dto,
    };
  }

  redirect("/admin/materials");
}
/**
 * Updates a material document in the database.
 *
 * @param prevState - The previous state of the form containing material data.
 * @param formData - The form data containing updated material information.
 * @returns A promise that resolves to the updated form state.
 *
 * @throws Will throw an error if the material update fails.
 */
export async function updateMaterial(
  prevState: TFormState<TMaterialDto>,
  formData: FormData
): Promise<TFormState<TMaterialDto>> {
  let dto;
  try {
    await authServerUtils.verifyAuth();

    const { data, imgFile } = materialsServerUtils.fromDataToDto(formData);

    dto = materialsServerUtils.sanitizeMaterialsDtoUpdate(data);

    materialsServerUtils.validateMaterialsDtoUpdate(dto);

    if (imgFile) {
      const imgPath = await imageUpload.uploadToCdn(imgFile);
      data.imgPath = imgPath;
    }

    const { imgPath, link, subject, _id } = dto;

    const collection = await getCollection<TMaterialDocument>("materials");
    const { modifiedCount } = await collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          subject,
          link,
          imgPath,
          updateDate: new Date(),
        },
      }
    );

    if (!modifiedCount) {
      throw AppError.create("Failed to update Materials");
    }

    revalidatePath("/admin/@materials");
    revalidatePath(`/materials`);
  } catch (error) {
    const err = AppError.handleResponse(error);
    return {
      errors: err.errors as Record<keyof TMaterialDto, string>,
      message: err.message,
      data: dto,
    };
  }
  redirect("/admin/materials");
}
/**
 * Retrieves materials based on the provided filter.
 *
 * @param {TMaterialFilter} filter - The filter criteria for retrieving materials.
 * @returns {Promise<TMaterial[]>} A promise that resolves to an array of materials.
 *
 * @throws Will throw an error if the retrieval process fails.
 *
 * The function constructs a MongoDB aggregation pipeline based on the filter criteria.
 * If the `isFull` property of the filter is true, the pipeline includes lookups and projections
 * to include detailed information about the creators and updaters of the materials.
 * Otherwise, it only includes basic material information.
 */
export async function getMaterials(
  filter: TMaterialFilter
): Promise<TMaterial[]> {
  try {
    const pipeline = [];

    const { isFull } = filter;

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
          imgPath: 1,
          link: 1,
          subject: 1,
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
    } else {
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          imgPath: 1,
          link: 1,
          subject: 1,
        },
      });
    }
    const collection = await getCollection<TMaterialDocument>("materials");
    return (await collection.aggregate<TMaterial>(pipeline).toArray()) || [];
  } catch (error) {
    AppError.create(`Failed to get Materials -> ${error}`);
    return [];
  }
}
/**
 * Retrieves a material document by its ID and formats it for editing.
 *
 * @param {string} id - The ID of the material to retrieve.
 * @returns {Promise<TMaterialDto>} A promise that resolves to the material data transfer object (DTO).
 * @throws {AppError} If the material is not found or if there is an error during retrieval.
 */
export async function getMaterialToEdit(id: string): Promise<TMaterialDto> {
  try {
    await authServerUtils.verifyAuth();

    const collection = await getCollection<TMaterialDocument>("materials");
    const pipeline = [];
    pipeline.push({ $match: { _id: new ObjectId(id) } });
    pipeline.push({
      $project: {
        _id: { $toString: "$_id" },
        imgPath: 1,
        link: 1,
        subject: 1,
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
    const dto = await collection.aggregate<TMaterialDto>(pipeline).next();

    if (!dto) {
      throw AppError.create("Material not found");
    }

    return dto;
  } catch (error) {
    throw AppError.create(`Failed to get Materials by ID -> ${error}`);
  }
}
/**
 * Deletes a material from the database by its ID.
 *
 * @param {string} id - The ID of the material to delete.
 * @throws {AppError} If the deletion fails or an error occurs during the process.
 * @returns {Promise<void>} A promise that resolves when the material is deleted and paths are revalidated.
 */
export async function deleteMaterial(id: string): Promise<void> {
  try {
    await authServerUtils.verifyAuth();
    const collection = await getCollection<TMaterialDocument>("materials");
    const { acknowledged } = await collection.deleteOne({
      _id: new ObjectId(id),
    });
    if (!acknowledged) {
      throw AppError.create("Failed to delete Materials");
    }
  } catch (error) {
    throw AppError.create(`Failed to delete Materials -> ${error}`);
  }

  revalidatePath("/admin/@materials");
  revalidatePath(`/materials`);
}
