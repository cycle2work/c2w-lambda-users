import chai, { expect } from "chai";
import { spy } from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import { handler } from "index";
import { STRAVA_CODE_TEST, USERS_COLLECTION } from "config";

import { getMongoClient } from "services/mongo-db";

describe("`Cycle2work auth function`", () => {

    let db;
    let context;
    let callback;

    before(async () => {
        db = await getMongoClient();
        await db.createCollection(USERS_COLLECTION);
    });

    after(async () => {
        await db.dropCollection(USERS_COLLECTION);
        await db.close();
    });

    beforeEach(() => {
        context = {
            succeed: spy()
        };
        callback = spy();
    });

    it("persist user token [CASE FAILED]", async () => {
        await handler({ queryStringParameters: { code: "Invalid code" } }, context, callback);

        expect(callback).to.have.been.calledOnce;

        const users = await db.collection(USERS_COLLECTION).find({}).toArray();
        expect(users).to.be.empty;
    });

    it("persist user token [CASE SUCCEDED]", async () => {
        await handler({ queryStringParameters: { code: STRAVA_CODE_TEST } }, context, callback);

        expect(callback).to.have.been.calledOnce;

        const users = await db.collection(USERS_COLLECTION).find({}).toArray();
        expect(users.length).to.be.equal(1);
    });

});
