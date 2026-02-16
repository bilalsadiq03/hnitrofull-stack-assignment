import { FastifyInstance } from "fastify";
import { createListHandler } from "./listController";
import { authMiddleware } from "../../middlewar/authMiddleware";

export default async function listRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [authMiddleware] }, createListHandler);
}
