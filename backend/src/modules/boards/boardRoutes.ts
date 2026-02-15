import { FastifyInstance } from "fastify";
import {
  createBoardHandler,
  getMyBoardsHandler,
  getBoardHandler,
  addMemberHandler,
} from "./boardController";
import { authMiddleware } from "../../middlewar/authMiddleware";

export default async function boardRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [authMiddleware] }, createBoardHandler);
  app.get("/", { preHandler: [authMiddleware] }, getMyBoardsHandler);
  app.get("/:id", { preHandler: [authMiddleware] }, getBoardHandler);
  app.post("/:id/members", { preHandler: [authMiddleware] }, addMemberHandler);
}
