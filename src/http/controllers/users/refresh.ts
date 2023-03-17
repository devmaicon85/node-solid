import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {


    await request.jwtVerify({ onlyCookie: true }); // vai verificar se tem o refresh token nos cookies


    const { role } = request.user;

    const token = await reply.jwtSign(
        {
            role
        }, {
            sign: {
                sub: request.user.sub
            }
        });

    const refreshToken = await reply.jwtSign(
        {
            role
        }, {
            sign: {
                sub: request.user.sub,
                expiresIn: "7d"
            }
        });



    return reply
        .setCookie("refreshToken", refreshToken, {
            path: "/",
            secure: true, // https
            sameSite: true, // no mesmo dominio
            httpOnly: true // somente backend
        })
        .status(200).send({
            token
        });


}