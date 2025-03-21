import { prisma } from "../utils/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import {parse }from "date-fns"

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

    // TROCAR PATIENTID POR CPF AQUI E NO PRISMA.SCHEME
    const verifyPatient = await prisma.patient.findUnique({ 
      where: {
        // TROCAR PARA CPF
        id: patientId 
      }
    })

    // VERIFICAR POR PELO ID / CPF / DO PROFISSIONAL  
    // const verifyPerformed = await prisma.user.findMany({
    //   where: {
    //     id
    //   }
    // })

    const parsedDate = parse(date, "yyyy-MM-dd", new Date());

    const appointment = await prisma.appointment.create({
      data: {
        date: parsedDate.toISOString(),
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

export const getAppointmentById = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };

    console.log("-------------------");
    console.log(id);
    console.log("-------------------");

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        scheduledBy: true,
        performedBy: true,
        clinic: true,
      },
    });

    if (!appointment) {
      console.log(`Appointment with ID: ${id} not found`);
      return reply.code(404).send({ error: "Appointment not found" });
    }

    return reply.code(200).send({ appointment });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}
