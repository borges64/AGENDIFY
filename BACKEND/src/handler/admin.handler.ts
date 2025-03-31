import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchama } from "../utils/validations";

export const getUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const users = await prisma.user.findMany();
        return reply.status(200).send(users);
    } catch (erro) { return console.error(erro) }
}


export const getAppointmentsByUser = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { userId }: any = req.params;
        const appointments = await prisma.appointment.findMany({
            where: { userId },
            include: {
                user: true,
            },
        });
        return reply.status(200).send(appointments);
    } catch (error) {
        return console.error(error);
    }
}