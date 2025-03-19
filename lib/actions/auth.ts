"use server";
//Types
import { TAuth, TAuthDocument, TAuthDto } from "@/types/auth.type";
import { TFormState } from "@/types/app.type";
//DB
import { getCollection } from "../../lib/mongoClient";
import { ObjectId } from "mongodb";
//Next
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
//Utils
import { authServerUtils } from "@/utils/server/auth.util";
import { AppError } from "@/utils/server/Error.util";
//Packages
import bcrypt from "bcrypt";

/**
 * Signs in a user with the provided form data.
 *
 * @param state - The current form state.
 * @param formData - The form data containing user credentials.
 * @returns A promise that resolves to the updated form state.
 *
 * @throws Will throw an error if the user is not found or if the credentials are invalid.
 */
export const signIn = async (
  state: TFormState<TAuthDto>,
  formData: FormData
): Promise<TFormState<TAuthDto>> => {
  let authDto;

  try {
    const { dto } = authServerUtils.formDataToDto(formData);
    authDto = authServerUtils.sanitizeAuthDto(dto);
    authServerUtils.validateAuthSignInDto(authDto);

    const { password, email } = authDto;

    const userCollection = await getCollection<TAuthDocument>("users");

    const user = await userCollection.findOne({ email });

    if (!user || !user?.passwordHash || !user?._id || !password || !email) {
      throw AppError.create("User not found", 404, true, {
        email: "Invalid credentials",
        password: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw AppError.create("Invalid credentials", 401, true, {
        email: "Invalid credentials",
        password: "Invalid credentials",
      });
    }

    const _id = user._id.toString();

    const token = await authServerUtils.createJWT(_id);

    await authServerUtils.createCookie(token);
  } catch (error) {
    const err = AppError.handleResponse(error);
    return {
      errors: err.errors as Record<keyof TAuthDto, string>,
      message: err.message,
      data: authDto,
    };
  }

  redirect("/admin");
};
// export const signUp = async (
//   state: TFormState<TAuthDto>,
//   formData: FormData
// ): Promise<TFormState<TAuthDto>> => {
//   let authDto;
//   try {
//     const { dto, passwordConfirm } = authServerUtils.formDataToDto(formData);
//     authDto = authServerUtils.sanitizeAuthDto(dto);
//     authServerUtils.validateAuthSignUpDto(authDto, passwordConfirm);

//     const { username, password, email } = authDto;
//     if (!email || !password) {
//       throw AppError.create("missing credentials", 400);
//     }
//     const userCollection = await getCollection<TUserDocument>("users");

//     const existingUser = await userCollection.findOne({ email });

//     if (existingUser) {
//       throw AppError.create("username taken", 400);
//     }

//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     const user = await userCollection.insertOne({
//       username,
//       passwordHash,
//       email,
//     });

//     if (!user.acknowledged) {
//       throw AppError.create("Error creating user");
//     }

//     const _id = user.insertedId.toString();

//     const token = await authServerUtils.createJWT(_id);

//     await authServerUtils.createCookie(token);
//   } catch (error) {
//     const err = AppError.handleResponse(error);
//     return {
//       errors: err.errors as Record<keyof TAuthDto, string>,
//       message: err.message,
//       data: authDto,
//     };
//   }

//   redirect("/admin");
// };
/**
 * Signs the user out by clearing the session cookie.
 *
 * This function sets the "session" cookie to an empty string and sets its expiration date to the past,
 * effectively removing it from the client's browser. The cookie is configured to be HTTP-only, secure
 * (if in production), and have a "lax" same-site policy.
 *
 * @throws {AppError} If an error occurs while setting the cookie, an AppError is thrown with a status code of 500.
 */
export const signOut = async (): Promise<void> => {
  try {
    const _cookies = await cookies();

    _cookies.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      expires: new Date(0),
    });
  } catch (error) {
    throw AppError.create(`${error}`, 500, false);
  }

  redirect("/");
};
/**
 * Retrieves the session user based on the session token stored in cookies.
 *
 * @returns {Promise<TAuth | null>} A promise that resolves to the authenticated user object or null if no valid session is found.
 *
 * @throws {AppError} If an error occurs during the process, an AppError is created and logged.
 */
export const getSessionUser = async (): Promise<TAuth | null> => {
  try {
    const token = (await cookies()).get("session")?.value;

    if (!token) {
      return null;
    }

    const payload = await authServerUtils.decodeToken(token);

    const userCollection = await getCollection<TAuthDocument>("users");

    const user = await userCollection.findOne({
      _id: new ObjectId(payload?.userId),
    });

    if (!user) {
      return null;
    }
    return { _id: user?._id.toString() };
  } catch (error) {
    AppError.create(`${error}`, 500, false);
    return null;
  }
};
