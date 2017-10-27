import { MongoClient } from "mongodb";

import {
    MONGODB_URL,
    USERS_COLLECTION
} from "../config";

let dbInstance;

export async function getMongoClient() {
    if (!dbInstance) {
        dbInstance = await MongoClient.connect(MONGODB_URL);
    }
    return dbInstance;
}

export async function upsertUser(id, user) {
    const db = await getMongoClient();
    await db.collection(USERS_COLLECTION).updateOne(
        { _id: id },
        { $set: user },
        { upsert: true }
    );
}
