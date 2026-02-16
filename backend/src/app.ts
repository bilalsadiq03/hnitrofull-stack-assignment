import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwtPlugin from "./plugins/jwt";
import { prisma } from "./plugins/prisma";
import authRoutes from "./modules/auth/authRoutes";
import boardRoutes from "./modules/boards/boardRoutes";
import listRoutes from "./modules/lists/listRoutes";
import taskRoutes from "./modules/tasks/taskRoutes";

export const app = Fastify({ logger: true });

app.register(cors, { origin: true });
app.register(jwtPlugin);

app.decorate("prisma", prisma);

app.register(authRoutes, { prefix: "/auth" });
app.register(boardRoutes, { prefix: "/boards" });
app.register(listRoutes, { prefix: "/lists" });
app.register(taskRoutes, { prefix: "/tasks" });

app.get("/health", async () => {
  return { status: "ok" };
});
