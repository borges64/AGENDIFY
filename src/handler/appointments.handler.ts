import { prisma } from "../utils/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

export const getAllAppointments = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const appointments = await prisma.appointment.findMany();
    return reply.code(200).send({ appointments });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export const newAppointment = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { date, patientId, scheduledById, performedById, clinicId, MoreInfo }: any = req.body;

    // Validate input
    if (!date || !patientId || !scheduledById || !performedById || !clinicId) {
      return reply.code(400).send({ error: "Date, patientId, scheduledById, performedById, and clinicId are required." });
    }

    const appointment = await prisma.appointment.create({
      data: {
        date,
        patientId,
        scheduledById,
        performedById,
        clinicId,
        MoreInfo,
      }
    });

    return reply.code(201).send({ message: "Appointment created successfully", appointment });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}
