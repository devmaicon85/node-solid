import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGynsUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymRepository();
    const useCase = new SearchGynsUseCase(gymsRepository);

    return useCase;
}