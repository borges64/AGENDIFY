import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../utils/prisma";
import { NewUserRequest } from "../utils/Interfaces";

export const newUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { name, email, role }: NewUserRequest = request.body as NewUserRequest;

    // Validate input
    if (!name || !email || !role) {
      return reply.code(400).send({ error: "Name, email, and role are required." });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return reply.code(400).send({ error: "Email já está em uso." });
    }

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: role.toUpperCase() as "SCHEDULER" | "PROFESSIONAL",
      }
    });

    return reply.code(201).send(user);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}
