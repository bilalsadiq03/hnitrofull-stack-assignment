import { FastifyInstance } from "fastify";
import {
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  moveTaskHandler,
} from "./taskController";
import { authMiddleware } from "../../middlewar/authMiddleware";

export default async function taskRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [authMiddleware] }, createTaskHandler);
  app.put("/:id", { preHandler: [authMiddleware] }, updateTaskHandler);
  app.delete("/:id", { preHandler: [authMiddleware] }, deleteTaskHandler);
  app.post("/:id/move", { preHandler: [authMiddleware] }, moveTaskHandler);
}
