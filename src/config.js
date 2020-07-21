export const LOG_LEVEL = process.env.LOG_LEVEL || "debug";
export const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;
export const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
export const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
export const USERS_COLLECTION = process.env.USERS_COLLECTION || "users";
export const CLUBS_COLLECTION = process.env.CLUBS_COLLECTION || "clubs";
export const MONGODB_URL =
    process.env.NODE_ENV !== "test"
        ? process.env.MONGODB_URL
        : "mongodb://localhost:27017/test?retryWrites=true&w=majority";
export const DB_NAME = process.env.DB_NAME || "c2w-mongol";
