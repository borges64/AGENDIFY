import fastify from "fastify";
import { JobRouter } from "./routes/user.router";
const server = fastify();

server.register(JobRouter)
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
