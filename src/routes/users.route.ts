import { FastifyInstance } from "fastify";
import { newUser, listAll, updateUser, deleteUser, loginUser } from "../handler/user.handler";

export const UserRoutes = async (fastify: FastifyInstance, options: any, done: any) => {
  fastify.post("/new-user", newUser) 
  fastify.put("/update-user/:id", updateUser)
  fastify.delete("/delete-user/:id", deleteUser)

  fastify.post("/login-admin", loginUser)
  fastify.get("/list-all", listAll)
  done()
}
