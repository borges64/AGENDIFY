import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../utils/prisma";
import { NewUserRequest } from "../utils/Interfaces";

// TODO: CRIAR PATITENT

export const listAll = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await prisma.user.findMany()
    const patitents = await prisma.patient.findMany();
    return reply.code(200).send({
      users,
      patitents
    });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const findUserDelete = await prisma.user.findUnique({
      where: { id: id }
    })
    if(!findUserDelete){
      return reply.code(404).send({ error: "User not found" });
    }
    const user = await prisma.user.delete({
      where: { id: id }
    });

    return reply.code(200).send({ message: "User deleted successfully", user });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const { name, email, role }: NewUserRequest = request.body as NewUserRequest;

    // Validate input
    if (!name || !email || !role) {
      return reply.code(400).send({ error: "Name, email, and role are required." });
    }

    const user = await prisma.user.update({
      where: { id: id },
      data: {
        name,
        email,
        role: role.toUpperCase() as "SCHEDULER" | "PROFESSIONAL",
      }
    });

    return reply.code(200).send({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

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

export const createPatient = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, cpf, name  } = request.body as any;
    const verifyPatient = await prisma.patient.findUnique({
      where: { email }})
    if(verifyPatient){
      return reply.code(400).send({ error: "Patient already exists" });
    }
    const patient = await prisma.patient.create({
      data: {
        email,
        cpf,
        name
      }
    });

    return reply.code(201).send({ message: "Patient created successfully", patient });

  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export const updatePatient = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };

    const verifyPatient = await prisma.patient.findUnique({
      where: { id }})
    if(!verifyPatient){
      return reply.code(404).send({ error: "Patient not found" });
    }
    const { email, cpf, name } = request.body as any;

    const patient = await prisma.patient.update({
      where: { id: id },
      data: {
        email,
        cpf,
        name
      }
    });

    return reply.code(200).send({ message: "Patient updated successfully", patient });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export const deletePatient = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const verifyPatient = await prisma.patient.findUnique({
      where: { id }})
    if(!verifyPatient){
      return reply.code(404).send({ error: "Patient not found" });
    }
    const patient = await prisma.patient.delete({
      where: { id: id }
    });

    return reply.code(200).send({ message: "Patient deleted successfully", patient });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}
