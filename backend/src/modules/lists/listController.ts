import { FastifyRequest, FastifyReply } from "fastify";
import { createList } from "./listService";

export async function createListHandler(request: FastifyRequest, reply: FastifyReply) {
  const { boardId, title } = request.body as { boardId: string; title: string };

  const list = await createList(boardId, title);
  reply.send(list);
}
