import { getToken } from "./services/strava";

import { log } from "./services/logger";
import { upsertUser } from "./services/mongo-db";

export default async function pipeline(event, context, callback) {

    log.debug({ event });

    const { queryStringParameters: { code } } = event;

    try {
        const response = await getToken(code);

        const { access_token } = response;
        const { athlete } = response;

        log.info({ athlete });

        await upsertUser(athlete.id, { access_token, ...athlete });

        callback(null, {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ msg: "Entity created" })
        });

    } catch (error) {
        log.debug({ error });
        callback(null, {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ msg: "Error" })
        });
    }

    context.succeed();
}
