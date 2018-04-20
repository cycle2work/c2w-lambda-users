import chai, { expect } from "chai";
import nock from "nock";
import { spy } from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import { handler } from "index";
import { CLUBS_COLLECTION, USERS_COLLECTION } from "config";

import {
    mockedAccesstoken,
    mockedAthlete,
    mockedClub,
    getInvalidToken,
    getValidToken,
    listAthleteClubs
} from "./mocks/strava";

import { getMongoClient } from "services/mongo-db";

nock("https://www.strava.com")
    .post("/api/v3/oauth/token")
    .reply(400, getInvalidToken())
    .post("/api/v3/oauth/token")
    .reply(200, getValidToken())
    .get("/api/v3/athlete/clubs?")
    .times(2)
    .reply(200, listAthleteClubs());

describe("`Cycle2work auth function`", () => {
    let db;
    let context;
    let callback;

    before(async () => {
        db = await getMongoClient();
        await db.createCollection(USERS_COLLECTION);
        await db.createCollection(CLUBS_COLLECTION);
    });

    after(async () => {
        await db.dropCollection(USERS_COLLECTION);
        await db.dropCollection(CLUBS_COLLECTION);
        await db.close();
    });

    beforeEach(() => {
        context = {
            succeed: spy()
        };
        callback = spy();
    });

    it("Invalid code provided, do not persist user data", async () => {
        await handler({ queryStringParameters: { code: "Invalid code" } }, context, callback);

        expect(callback).to.have.been.calledOnce;

        const users = await db
            .collection(USERS_COLLECTION)
            .find({})
            .toArray();
        expect(users).to.be.empty;

        const clubs = await db
            .collection(CLUBS_COLLECTION)
            .find({})
            .toArray();
        expect(clubs).to.be.empty;
    });

    it("Valid code provided, persist user token and clubs", async () => {
        await handler({ queryStringParameters: { code: "Valid code" } }, context, callback);

        expect(callback).to.have.been.calledOnce;

        const users = await db
            .collection(USERS_COLLECTION)
            .find({})
            .toArray();
        expect(users.length).to.be.equal(1);

        const [user] = users;
        expect(user).to.be.deep.equal({
            _id: user.id,
            access_token: mockedAccesstoken,
            ...mockedAthlete,
            clubs: [mockedClub]
        });

        const clubs = await db
            .collection(CLUBS_COLLECTION)
            .find({})
            .toArray();
        expect(clubs.length).to.be.equal(1);
        const [club] = clubs;

        expect(club).to.be.deep.equal({
            _id: club.id,
            access_token: mockedAccesstoken,
            ...mockedClub
        });
    });
});
