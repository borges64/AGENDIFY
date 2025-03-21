import { FastifyInstance } from "fastify";
import { newUser, listAll, updateUser, deleteUser, loginUser } from "../handler/user.handler";

export const UserRoutes = async (fastify: FastifyInstance, options: any, done: any) => {
  fastify.post("/new-user", newUser) 
  fastify.put("/update-user/:id", updateUser)
  fastify.delete("/delete-user/:id", deleteUser)

  // LOGIN AINDA NÃO FUNCIONAL []
  fastify.post("/login-admin", loginUser)
  
  // ADICIONAR AUTH PARA ACESSO - SOMENTE ADMINS PODEM LISTAR TODOS OS USUÁRIOS []
  fastify.get("/list-all", listAll)
  done()
}
