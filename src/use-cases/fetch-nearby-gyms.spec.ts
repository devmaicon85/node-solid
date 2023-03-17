import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;// = new InMemoryUsersRepository();
let sut: FetchNearbyGymsUseCase;// = new AuthenticateUseCase(usersRepository);

describe("Fetch Nearby Gyms Use Case", () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);
    });

    it("should be able to fetch nearby gyms", async () => {

        await gymsRepository.create({
            title: "near gym",
            description: null,
            phone: null,
            latitude: -29.953879706457148,
            longitude: -51.10357820257568,
            

        });

        await gymsRepository.create({
            title: "far gym",
            description: null,
            phone: null,
            latitude: -29.938782352189556,
            longitude: -50.99077024343817

        });

        const { gyms } = await sut.execute({
            userLatitude: -29.955503,
            userLongitude: -51.106825
        });

        expect(gyms).toHaveLength(1);

        expect(gyms).toEqual([
            expect.objectContaining({ title: "near gym" }),
        ]);

    });


    // it("should be able to fetch paginated gyns search", async () => {


    //     for (let i = 1; i <= 22; i++) {

    //         await gymsRepository.create({
    //             title: "JavaScript Gym " + i,
    //             description: null,
    //             phone: null,
    //             latitude: 0,
    //             longitude: 0
    //         });
    //     }



    //     const { gyms } = await sut.execute({
    //         query: "JavaScript",
    //         page: 2
    //     });

    //     expect(gyms).toHaveLength(2);

    //     expect(gyms).toEqual([
    //         expect.objectContaining({ title: "JavaScript Gym 21" }),
    //         expect.objectContaining({ title: "JavaScript Gym 22" }),
    //     ]);


    // });





});