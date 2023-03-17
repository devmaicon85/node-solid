import { it, describe, expect, beforeAll, afterEach } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";


describe("Search Gyms (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterEach(async () => {
        await app.close();
    });

    it("shoulb be able to Search gyms by title", async () => {


        const { token } = await createAndAuthenticateUser(app, "ADMIN");

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "JavaScript Gym",
                description: "Some description",
                phone: "11999999999",
                latitude: 0,
                longitude: 0
            });

        
        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "TypeScript Gym",
                description: "Some description",
                phone: "11999999999",
                latitude: 0,
                longitude: 0
            });

        const response = await request(app.server)
            .get("/gyms/search")
            .query({
                q:"JavaScript"
            })
            .set("Authorization", `Bearer ${token}`).send();


        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title:"JavaScript Gym"
            })
        ]);


    });
});