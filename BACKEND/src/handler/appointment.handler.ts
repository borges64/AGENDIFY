import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../utils/prisma";

export const newAppointment = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { userId, title, description, dateTime }: any = req.body;
    const appointment = await prisma.appointment.create({
      data: {
        userId,
        title, 
        description, 
        dateTime
      },
    });
    return reply.status(201).send({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    return console.error(error);
  }
}

export const getAppointments = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true,
      },
    });
    return reply.status(200).send(appointments);
  } catch (error) {
    return console.error(error);
  }
}

export const getAppointmentById = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id }: any = req.params;
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    if (!appointment) return reply.status(400).send({ message: "Appointment not found" });
    return reply.status(200).send(appointment);
  } catch (error) {
    return console.error(error);
  }
}

export const updateAppointment = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id }: any = req.params;
    const { title, description, dateTime }: any = req.body;
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        title,
        description,
        dateTime,
      },
    });
    return reply.status(200).send({
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    return console.error(error);
  }
}
export const confirmAppointment = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id }: any = req.params;
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: "confirmed",
      },
    });
    return reply.status(200).send({
      message: "Appointment confirmed successfully",
      appointment,
    });
  } catch (error) {
    return console.error(error);
  }
}

export const deleteAppointment = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id }: any = req.params;
    const appointment = await prisma.appointment.delete({
      where: { id },
    });
    return reply.status(200).send({
      message: "Appointment deleted successfully",
      appointment,
    });
  } catch (error) {
    return console.error(error);
  }
}
