import "server-only";

import { Document, MongoClient, ObjectId } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = { appName: "hour-of-focus" };

let mongoClient: MongoClient;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // eslint-disable-next-line prefer-const
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  mongoClient = globalWithMongo._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  mongoClient = new MongoClient(uri, options);
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.

export const connectDB = async () => {
  await mongoClient.connect();
};

export const closeDB = async () => {
  await mongoClient.close();
};
//Objectid validation is here because validation util my be used in the front
export const isValidObjectId = (id: string): boolean => {
  return ObjectId.isValid(id);
};

export const getCollection = async <T extends Document>(
  collectionName: "faqs" | "users" | "materials" | "articles" | "testimonies"
) => {
  await mongoClient.connect();
  const db = mongoClient.db(options.appName);
  return db.collection<T>(collectionName);
};
