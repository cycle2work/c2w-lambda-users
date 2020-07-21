import mongodb from "mongodb";

import { MONGODB_URL, USERS_COLLECTION, CLUBS_COLLECTION, DB_NAME } from "../config";

let clientInstance;

export async function getMongoClient() {
    if (!clientInstance) {
        /* eslint-disable-next-line */
        clientInstance = await mongodb.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return clientInstance;
}

export async function upsertUser(id, user) {
    const client = await getMongoClient();
    await client.db(DB_NAME).collection(USERS_COLLECTION).updateOne({ id }, { $set: user }, { upsert: true });
}

export async function upsertClub(id, club) {
    const client = await getMongoClient();
    await client.db(DB_NAME).collection(CLUBS_COLLECTION).updateOne({ id }, { $set: club }, { upsert: true });
}
