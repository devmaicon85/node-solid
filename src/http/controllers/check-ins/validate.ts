import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {


    const validateInParamsSchema = z.object({
        checkInId: z.string().uuid()
    });

    const { checkInId } = validateInParamsSchema.parse(request.params);

    const useCase = makeValidateCheckInUseCase();
    await useCase.execute({
        checkInId
    });

    return reply.status(204).send();
}