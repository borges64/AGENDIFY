import { FastifyRequest, FastifyReply } from "fastify";
import { IClinic } from "../utils/Interfaces";
import { prisma } from "../utils/prisma";

export const newClinic = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const data: IClinic = req.body as any;
    const verifyClinicExists = await prisma.clinic.findUnique({
      where: {
        cnpj: data.cnpj,
        email: data.email
      }
    })
    if (verifyClinicExists) {
      return reply.code(400).send({ message: "Clinic already exists" })
    }

    const clinic = await prisma.clinic.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        email: data.email,
        address: data.address,
        phone: data.phone
      }
    })
    return reply.code(201).send({ message: "Clinic created successfully", clinic })
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" })
  }

}

export const listAllClinics = async (req: FastifyRequest, reply: FastifyReply) => {
  const clinics = await prisma.clinic.findMany()
  return reply.code(200).send({ clinics })
}

export const updateClinic = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };
    const data: any = req.body as IClinic;
    const clinic = await prisma.clinic.update({
      where: {
        id
      },
      data: {
        name: data.name,
        cnpj: data.cnpj,
        email: data.email,
        address: data.address,
        phone: data.phone
      }
    })
    return reply.code(200).send({ message: "Clinic updated successfully", clinic })
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" })
  }

}

export const deleteClinic = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };
    const clinic = await prisma.clinic.delete({
      where: {
        id
      }
    })
    return reply.code(200).send({ message: "Clinic deleted successfully", clinic })
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" })
  }
}
