import { FastifyInstance } from "fastify";
import { newClinic, listAllClinics, updateClinic, deleteClinic } from "../handler/clinic.handler"

export const ClinicRoutes = async (fastify: FastifyInstance, options: any, done: any) => {
  fastify.post("/new-clinic", newClinic)
  fastify.put("/update-clinic/:id", updateClinic)
  fastify.delete("/delete-clinic/:id", deleteClinic)

  fastify.get("/list-all-clinics", listAllClinics)

  done()
}
