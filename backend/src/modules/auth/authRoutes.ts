import { FastifyInstance } from "fastify";
import { registerHandler, loginHandler, meHandler } from "./authController";
import { authMiddleware } from "../../middlewar/authMiddleware";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/register", registerHandler);
  app.post("/login", loginHandler);

  app.get("/me", { preHandler: [authMiddleware] }, meHandler);
}
