import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchama } from "../utils/validations";


export const newUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const validateData = userSchama.parse(req.body);
    const verifyUser = await prisma.user.findUnique({ where: { email: validateData.email, cpf: validateData.cpf } });
    if (verifyUser) return reply.status(400).send({ message: "Email ou CPF já cadastrados na base de dados" });
    const hashPassword = await bcrypt.hash(validateData.password, 8);
    const user = await prisma.user.create({
      data: {
        name: validateData.name,
        email: validateData.email,
        cpf: validateData.cpf,
        phone: validateData.phone,
        password: hashPassword,
        address: validateData.address,
      }
    })
    return reply.status(201).send({
      message: "Usuário cadastrado com sucesso",
      user
    });
  } catch(erro) { return console.error(erro) }
}

export const updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    // Valida os dados do corpo da requisição
    const validateData = userSchama.parse(req.body);

    // Obtém o ID do usuário a partir dos parâmetros da rota
    const { id }: { id: string } = req.params as any;

    // Verifica se o usuário existe
    const verifyUser = await prisma.user.findUnique({ where: { id } });
    if (!verifyUser) {
      return reply.status(404).send({ message: "Usuário não encontrado" });
    }

    // Atualiza os dados do usuário
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: validateData.name,
        email: validateData.email,
        cpf: validateData.cpf,
        password: validateData.password,
        address: validateData.address,
        phone: validateData.phone,
      },
    });

    // Retorna a resposta de sucesso
    return reply.status(200).send({
      message: "Usuário atualizado com sucesso",
      user,
    });
  } catch (erro) {
    console.error(erro);
    return reply.status(500).send({ message: "Erro ao atualizar usuário" });
  }
};

export const deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id }: any = req.params;
    const user = await prisma.user.delete({ where: { id: id } });
    const verifyUser = await prisma.user.findUnique({ where: { id: id } });
    if (verifyUser) return reply.status(400).send({ message: "Usuário não encontrado" });
    return reply.status(200).send({
      message: "Usuário deletado com sucesso",
      user
    });
  } catch(erro) { return console.error(erro) }
}
