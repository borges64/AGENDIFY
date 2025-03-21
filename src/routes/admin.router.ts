import { FastifyInstance } from "fastify";
import { createAdmin, ListAllAdmins } from "../handler/admin.handler";

export const AdminRoutes = async (fastify: FastifyInstance, options: any, done: any) => {
  fastify.post("/admin-register", createAdmin) 
  fastify.get("/admin-list", ListAllAdmins)
  // fastify.put("/update-admin/:id", updateAdmin)
  // fastify.delete("/delete-admin/:id", deleteAdmin)
  done()
}
