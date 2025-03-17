import { FastifyInstance } from "fastify";
import { newUser, listAll, updateUser, deleteUser, createPatient, updatePatient, deletePatient } from "../handler/user.handler";

export const UserRoutes = async (fastify: FastifyInstance, options: any, done: any) => {
  fastify.post("/new-user", newUser) 
  fastify.put("/update-user/:id", updateUser)
  fastify.delete("/delete-user/:id", deleteUser)

  fastify.get("/list-all", listAll)

  fastify.post("/new-patient", createPatient)
  fastify.put("/update-patient/:id", updatePatient)
  fastify.delete("/delete-patient", deletePatient)

  // done()
}
