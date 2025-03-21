import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../utils/prisma";
import { IAdmin } from "../utils/Interfaces";
import bcrypt from "bcrypt";
import { z } from "zod";

const adminSchema = z.object({
  username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().min(1, "No minimo um numero"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  phone: z.string().optional()
});

export const createAdmin = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const parsedBody = adminSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return reply.code(400).send({ error: parsedBody.error.errors });
    }
    const { username, cpf, email, password, phone } = parsedBody.data

    const verifyAdmin = await prisma.admin.findUnique({ where: { email,  } })
    if(verifyAdmin){
      return reply.code(409).send({ error: "Admin already exists" });
    }

    // const hashPass = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        cpf,
        password,
        phone
      }
    });

    return reply.code(201).send({ message: "Admin created successfully", admin });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export const ListAllAdmins =  async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const list = await prisma.admin.findMany()
    return reply.code(201).send(list)
  } catch(erro) 
  { 
    return console.error(erro)
  }
}
