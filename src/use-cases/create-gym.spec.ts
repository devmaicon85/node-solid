import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it("should be able to gym", async () => {

        const { gym } = await sut.execute({
            title: "JavaScript Gym",
            description: null,
            latitude: 0,
            longitude: 0,
            phone: null
        });

        expect(gym.id).toEqual(expect.any(String));

    });


});