export const clubId = 80327326;

export function getInvalidToken() {
    return {
        message: "Bad Request",
        errors: [
            {
                resource: "RequestToken",
                field: "code",
                code: "invalid",
            },
        ],
    };
}

export const mockedAthlete = {
    id: 227615,
    firstname: "John",
    lastname: "Apple",
    username: "Strava",
    profile: "http://pics.com/227615/large.jpg",
    city: "San Francisco",
    country: "United States",
    state: "California",
};

export const mockedAccesstoken = "a4b945687g...";
export const mockedRefreshtoken = "e5n567567...";
export const mockedExpireAt = "1568775134";

export function getValidToken() {
    return {
        access_token: mockedAccesstoken,
        refresh_token: mockedRefreshtoken,
        expires_at: mockedExpireAt,
        athlete: mockedAthlete,
    };
}

export const mockedClub = {
    id: clubId,
    name: "Team Strava Cycling",
    profile: "http://pics.com/clubs/1/large.jpg",
    city: "San Francisco",
    country: "United States",
    state: "Alabama",
    member_count: 23,
};

export function listAthleteClubs() {
    return [mockedClub];
}
