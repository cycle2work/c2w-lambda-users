import { map } from "bluebird";

import { getToken, listAthleteClubs } from "./services/strava";

import { log } from "./services/logger";
import { upsertUser, upsertClub } from "./services/mongo-db";

export default async function pipeline(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        log.debug({ event });

        const {
            queryStringParameters: { code },
        } = event;

        const response = await getToken(code);

        const { access_token, refresh_token, expires_at } = response;
        const { athlete } = response;

        log.info({ athlete });

        const clubs = await listAthleteClubs({ access_token });

        const mappedClubs = clubs.map(({ id, city, country, state, profile, name, member_count }) => ({
            id,
            city,
            country,
            state,
            profile,
            name,
            member_count,
        }));

        const { firstname, lastname, city, country, state, id, profile, username } = athlete;

        await upsertUser(athlete.id, {
            access_token,
            refresh_token,
            expires_at,
            firstname,
            lastname,
            city,
            country,
            state,
            id,
            profile,
            username,
            clubs: mappedClubs,
        });

        await map(mappedClubs, async (club) => {
            await upsertClub(club.id, club);
        });

        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(athlete),
        });
    } catch (error) {
        log.debug({ error });
        callback(null, {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ msg: "Error" }),
        });
    }

    context.succeed();
}
