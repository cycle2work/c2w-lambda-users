import strava from "strava-v3";

export const getToken = (...args) => strava.oauth.refreshToken(...args);
export const listAthleteClubs = (...args) => strava.athlete.listClubs(...args);
