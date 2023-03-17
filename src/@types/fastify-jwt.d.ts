import "@fastify/jwt";

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        // payload: {  } // payload type is used for signing and verifying
        user: {
            sub: string,
            role: "ADMIN" | "MEMBER"
            // name: string,
            // age: number
        } // user type is return type of `request.user` object
    }
}
