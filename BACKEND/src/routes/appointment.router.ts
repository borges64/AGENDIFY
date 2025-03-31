import { FastifyInstance } from "fastify";
import { confirmAppointment, deleteAppointment, getAppointmentById, newAppointment, updateAppointment } from "../handler/appointment.handler";
import { getAppointmentsByUser } from "../handler/admin.handler";

export async function AppointmentRouter(app: FastifyInstance) {
    app.post("/appointment-register", newAppointment);
    app.get("/appointment-by-id/:id", getAppointmentById);
    app.delete("/appointment-del/:id", deleteAppointment);
    app.put("/appointment-up/:id", updateAppointment);
    app.post("/appointment-confirm/:id", confirmAppointment);

    // admin
    app.get("/appointment-by-user/:id", getAppointmentsByUser);
}