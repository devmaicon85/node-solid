import { it, describe, expect, beforeAll, afterEach } from "vitest";
import { app } from "@/app";
import request from "supertest";


describe("Register (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterEach(async () => {
        await app.close();
    });

    it("shoulb be able to register", async () => {
        const response = await request(app.server).post("/users").send({
            name: "Jonh Doe",
            email: "johndoe@example.com",
            password: "123456"
        });

        expect(response.statusCode).toEqual(201);
    });
});