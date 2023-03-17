import { it, describe, expect, beforeAll, afterEach } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";


describe("Create Check-in (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterEach(async () => {
        await app.close();
    });

    it("shoulb be able to create Check-in gym", async () => {


        const { token } = await createAndAuthenticateUser(app);

        const gym = await prisma.gym.create({
            data: {
                title: "JavaScript Gym",
                latitude: -29.953879706457148,
                longitude: -51.10357820257568,
            }
        });

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                latitude: -29.953879706457148,
                longitude: -51.10357820257568,
            });

        expect(response.statusCode).toEqual(201);
    });
});