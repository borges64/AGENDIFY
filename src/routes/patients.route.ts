import { FastifyInstance } from "fastify";

import { createPatient, deletePatient, updatePatient }  from "../handler/user.handler";
export const PatientRoutes = async (fastify: FastifyInstance, options: any, done: any) => {
  fastify.post("/new-patient", createPatient)
  fastify.put("/update-patient/:id", updatePatient)
  fastify.delete("/delete-patient", deletePatient)
  done()
}
