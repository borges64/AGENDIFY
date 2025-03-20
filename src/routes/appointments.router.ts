import { FastifyInstance } from "fastify";

import { getAllAppointments, getAppointmentById, newAppointment } from "../handler/appointments.handler";

export const appointmentsRouter = async (fastify: FastifyInstance) => {
  fastify.post("/appointments", newAppointment);
  fastify.get("/get-appointments", getAllAppointments)
  fastify.get("/get-appointments/:id", getAppointmentById);
}
