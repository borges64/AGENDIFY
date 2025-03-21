import { FastifyRequest, FastifyReply } from "fastify";
import { IClinic } from "../utils/Interfaces";
import { prisma } from "../utils/prisma";

export const newClinic = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const data: IClinic = req.body as IClinic;
    const verifyEmailExists = await prisma.clinic.findUnique({ where: { email: data.email } })
    const verifyCNPJExists = await prisma.clinic.findUnique({ where: { cnpj: data.cnpj } })
    if(verifyEmailExists || verifyCNPJExists) {
      return reply.code(400).send({ error: "Email or CNPJ already exists" })
    }

    // CONVERSAR COM O MAYRON SOBRE FILAS, CLINICAS NÃO PODE SER CRIADAS A ESMO, SEM UMA VERIFICAÇÃO DE DADOS E REGISTRO
    // OLHAR MAIS INFORMAÇÕES SOBRE A CLINICA E SEUS DADOS - AUTORIZAÇÃO DO GOVERNO PARA FUNCIONAMENTO - MENOS CRITERIOSO
    const clinic = await prisma.clinic.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        email: data.email,
        password: data.password,
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
  const clinics = await prisma.clinic.findMany({
    include: {
      appointments: true
    }
  })
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
