import fastify from "fastify";
import { AdminRoutes } from "./routes/admin.router";

const server = fastify({ logger: true });

// server.register(UserRoutes)
// server.register(ClinicRoutes)
// server.register(appointmentsRouter)
// server.register(PatientRoutes)
server.register(AdminRoutes)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
