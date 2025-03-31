import { FastifyInstance } from "fastify";
import { deleteUser, newUser, updateUser } from "../handler/user.handler";
import {  getAppointments } from "../handler/appointment.handler";
import { getUsers } from "../handler/admin.handler";

export const JobRouter = async (fastify: FastifyInstance) => {
  fastify.post("/user-register", newUser)
  fastify.put("/update-user/:id", updateUser);
  fastify.delete("/delete-user/:id", deleteUser);
  // admin routes
  fastify.get("/admin/all-appointments", getAppointments)
  fastify.get("/admin/all-users", getUsers)
}
