import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsErrors } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;// = new InMemoryUsersRepository();
let sut: CheckInUseCase;// = new AuthenticateUseCase(usersRepository);
let gymsRespository: InMemoryGymsRepository;

describe("Check-in Use Case", () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRespository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRespository);

        await gymsRespository.create({
            id: "gym-01",
            title: "JavaScript Gym",
            description: "-",
            phone: "-",
            latitude: new Decimal(0),
            longitude: new Decimal(0),
            created_at: new Date()
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to check in", async () => {

        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0

        });
        expect(checkIn.id).toEqual(expect.any(String));

    });


    it("should not be able to check in twice in the same day", async () => {

        vi.setSystemTime(new Date(2023, 0, 20, 5, 0, 0));

        await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0

        });


        await expect(() => sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0

        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsErrors);

    });


    it("should be able to check in twice but in different days", async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
        await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0

        });


        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0

        });

        expect(checkIn.id).toEqual(expect.any(String));
    });



    it("should not be able to check in on distant gym", async () => {


        gymsRespository.items.push({
            id: "gym-02",
            title: "JavaScript Gym",
            description: "-",
            phone: "-",
            latitude: new Decimal(-29.953903),
            longitude: new Decimal(-51.104011),
            created_at: new Date()
        });


        await expect(() => sut.execute({
            gymId: "gym-02",
            userId: "user-01",
            userLatitude: -29.954382,
            userLongitude: -51.105122

        })).rejects.toBeInstanceOf(MaxDistanceError);

    });


});