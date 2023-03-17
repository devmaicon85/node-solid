import { it, describe, expect, beforeAll, afterEach } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";


describe("Create (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterEach(async () => {
        await app.close();
    });

    it("shoulb be able to create a gym", async () => {


        const { token } = await createAndAuthenticateUser(app, "ADMIN");

        const response = await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "JavaScript Gym",
                description: "Some description",
                phone: "11999999999",
                latitude: 0,
                longitude: 0
            });

        expect(response.statusCode).toEqual(201);
    });
});