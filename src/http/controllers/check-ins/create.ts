import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {


    const checkInParamsSchema = z.object({
        gymId: z.string().uuid()
    });

    const checkInBodySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180;
        }),

    });


    const { gymId } = checkInParamsSchema.parse(request.params);
    const { latitude, longitude } = checkInBodySchema.parse(request.body);

    const checkInUseCase = makeCheckInUseCase();
    await checkInUseCase.execute({
        gymId,
        userLatitude: latitude,
        userLongitude: longitude,
        userId: request.user.sub

    });



    return reply.status(201).send();
}