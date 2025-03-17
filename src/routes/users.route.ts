import { FastifyInstance } from "fastify";
import { newUser } from "../handler/user.handler";

export const UserRoutes = async (fastify: FastifyInstance, options: any, done: any) => {
  fastify.post("/new-user", newUser) 
}
