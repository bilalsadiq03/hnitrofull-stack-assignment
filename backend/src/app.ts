import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwtPlugin from "./plugins/jwt";
import { prisma } from "./plugins/prisma";
import authRoutes from "./modules/auth/authRoutes";

export const app = Fastify({ logger: true });

app.register(cors, { origin: true });
app.register(jwtPlugin);

app.decorate("prisma", prisma);

app.register(authRoutes, { prefix: "/auth" });

app.get("/health", async () => {
  return { status: "ok" };
});
