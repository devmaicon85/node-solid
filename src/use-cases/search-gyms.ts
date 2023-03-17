import type { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";


interface SearchGynsUseCaseRequest {
    query: string;
    page: number
}


interface SearchGynsUseCaseResponse {
    gyms: Gym[];
}

export class SearchGynsUseCase {

    constructor(private gymsRepository: GymsRepository) { }

    async execute({ query, page }: SearchGynsUseCaseRequest): Promise<SearchGynsUseCaseResponse> {



        const gyms = await this.gymsRepository.searchMany(
            query, page
        );


        return { gyms };
    }

}
