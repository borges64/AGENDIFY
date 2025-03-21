import { FastifyInstance } from "fastify";
import { newClinic, listAllClinics, updateClinic, deleteClinic } from "../handler/clinic.handler"

export const ClinicRoutes = async (fastify: FastifyInstance, options: any, done: any) => {
  fastify.post("/new-clinic", newClinic)
  fastify.put("/update-clinic/:id", updateClinic)

// SOMENTE ADMINISTRADORES PODEM DELETAR CLINICAS - MEDIANTE REGRA DE NEGOCIO OU CONTRATO 
  fastify.delete("/delete-clinic/:id", deleteClinic)

  // BASTA SER USUARIO DO SISTEMA E PARA TER ACESSO - INFORMAÇÕES RESTRITAS
  fastify.get("/list-all-clinics", listAllClinics)

  done()
}
