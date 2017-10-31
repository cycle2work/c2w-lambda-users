import strava from "strava-v3";

import { promisify } from "bluebird";

export const getToken = promisify(strava.oauth.getToken);
export const listAthleteClubs = promisify(strava.athlete.listClubs);
