import { it, describe, expect, beforeAll, afterEach } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";


describe("Nearby Gyms (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterEach(async () => {
        await app.close();
    });

    it("shoulb be able to list nearby gyms", async () => {


        const { token } = await createAndAuthenticateUser(app, "ADMIN");

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "JavaScript Gym",
                description: "Some description",
                phone: "11999999999",
                latitude: -29.953879706457148,
                longitude: -51.10357820257568,
            });


        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "TypeScript Gym",
                description: "Some description",
                phone: "11999999999",
                latitude: -29.938782352189556,
                longitude: -50.99077024343817
            });

        const response = await request(app.server)
            .get("/gyms/nearby")
            .query({
                latitude: -29.953879706457148,
                longitude: -51.10357820257568,
            })
            .set("Authorization", `Bearer ${token}`).send();


        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "JavaScript Gym"
            })
        ]);


    });
});