import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string;
    page: number;
}

interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[];
}


export class FetchUserCheckInsHistoryUseCase {
    constructor(
        private checkInsRespository: CheckInsRepository,
    ) { }

    async execute({ userId, page }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {

        const checkIns = await this.checkInsRespository.findManyByUserId(userId, page);



        return { checkIns };

    }
}