import { it, describe, expect, beforeAll, afterEach } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";


describe("Validate Check-in (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterEach(async () => {
        await app.close();
    });

    it("shoulb be able to validate Check-in", async () => {


        const { token } = await createAndAuthenticateUser(app, "ADMIN");

        const gym = await prisma.gym.create({
            data: {
                title: "JavaScript Gym",
                latitude: -29.953879706457148,
                longitude: -51.10357820257568,
            }
        });

        const user = await prisma.user.findFirstOrThrow();


        let checkIn = await prisma.checkIn.create({
            data:
            {
                gym_id: gym.id,
                user_id: user.id
            }
        });

        const response = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                latitude: -29.953879706457148,
                longitude: -51.10357820257568,
            });

        expect(response.statusCode).toEqual(204);

        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where:{
                id:checkIn.id
            }
        });

        expect(checkIn.validated_at).toEqual(expect.any(Date));
    });
});