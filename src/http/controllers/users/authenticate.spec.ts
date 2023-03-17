import { it, describe, expect, beforeAll, afterEach } from "vitest";
import { app } from "@/app";
import request from "supertest";


describe("Authenticate (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterEach(async () => {
        await app.close();
    });

    it("shoulb be able to authenticate", async () => {
        await request(app.server).post("/users").send({
            name: "Jonh Doe",
            email: "johndoe@example.com",
            password: "123456"
        });

        const response = await request(app.server).post("/sessions").send({
            email: "johndoe@example.com",
            password: "123456"
        });


        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token:expect.any(String)
        });
    });
});