import fastify from "fastify";
import { UserRoutes } from "./routes/users.route";

const server = fastify({ logger: true });

server.register(UserRoutes)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
