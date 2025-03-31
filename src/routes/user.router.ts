import { FastifyInstance } from "fastify";
import { deleteUser, getUsers, newUser, updateUser } from "../handler/user.handler";
import { confirmAppointment, deleteAppointment, getAppointmentById, getAppointmentsByUser, newAppointment, updateAppointment } from "../handler/appointment.handler";

export const JobRouter = async (fastify: FastifyInstance) => {
  fastify.get("/users-list", getUsers);  
  fastify.post("/user-register", newUser)
  fastify.put("/update-user/:id", updateUser);
  fastify.delete("/delete-user/:id", deleteUser);

  fastify.post("/appointment-register", newAppointment);
  fastify.get("/appointment-by-user/:id", getAppointmentsByUser);
  fastify.get("/appointment-by-id/:id", getAppointmentById);
  fastify.delete("/appointment-del/:id", deleteAppointment);
  fastify.put("/appointment-up/:id", updateAppointment);
  fastify.post("/appointment-confirm/:id", confirmAppointment);
}
