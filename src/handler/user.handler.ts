import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../utils/prisma";

export const newUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { name, email, cpf}: any = request.body;

    const existingUser = await prisma.patient.findFirst({
      where: {
        OR: [
          { email: email },
          { cpf: cpf }
        ]
      }
    });

    if (existingUser) {
      return reply.code(400).send({ error: "Email ou CPF já estão em uso." });
    }

    const user = await prisma.patient.create({
      data: {
        name, email, cpf,
      }
    })
    return reply.code(201).send(user);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}
