import { FastifyRequest, FastifyReply } from "fastify";
import { registerSchema, loginSchema } from "./authSchema";
import { registerUser, loginUser } from "./authService";

export async function registerHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = registerSchema.parse(request.body);

  const user = await registerUser(body.name, body.email, body.password);

  const token = request.server.jwt.sign({ id: user.id, email: user.email });

  reply.send({ user: { id: user.id, name: user.name, email: user.email }, token });
}

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = loginSchema.parse(request.body);

  const user = await loginUser(body.email, body.password);

  const token = request.server.jwt.sign({ id: user.id, email: user.email });

  reply.send({ user: { id: user.id, name: user.name, email: user.email }, token });
}

export async function meHandler(request: FastifyRequest, reply: FastifyReply) {
  return reply.send({ user: request.user });
}
