import fastify from "fastify";
import { UserRoutes } from "./routes/users.route";
import { ClinicRoutes } from "./routes/clinic.route";
import { appointmentsRouter } from "./routes/appointments.router";

const server = fastify({ logger: true });

server.register(UserRoutes)
server.register(ClinicRoutes)
server.register(appointmentsRouter)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
