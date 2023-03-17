import { it, describe, expect, beforeAll, afterEach } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";


describe("List History Check-ins (e2e)", () => {


    beforeAll(async () => {
        await app.ready();
    });

    afterEach(async () => {
        await app.close();
    });

    it("shoulb be able to list the history of Check-ins", async () => {


        const { token } = await createAndAuthenticateUser(app);


        const user = await prisma.user.findFirstOrThrow();

        const gym = await prisma.gym.create({
            data: {
                title: "JavaScript Gym",
                latitude: -29.953879706457148,
                longitude: -51.10357820257568,
            }
        });

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
                {
                    gym_id: gym.id,
                    user_id: user.id
                }
            ]
        });

        const response = await request(app.server)
            .get("/check-ins/history")
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id
            })
        ]);
    });
});