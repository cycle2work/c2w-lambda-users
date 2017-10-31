import { getToken, listAthleteClubs } from "./services/strava";

import { log } from "./services/logger";
import { upsertUser, upsertClub } from "./services/mongo-db";

export default async function pipeline(event, context, callback) {

    log.debug({ event });

    const { queryStringParameters: { code } } = event;

    try {
        const response = await getToken(code);

        const { access_token } = response;
        const { athlete } = response;

        log.info({ athlete });

        const clubs = await listAthleteClubs({ access_token });

        await upsertUser(athlete.id, {
            access_token,
            ...athlete
        });

        await clubs.forEach(async (club) => {
            await upsertClub(club.id, {
                access_token,
                ...club
            });
        });

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
