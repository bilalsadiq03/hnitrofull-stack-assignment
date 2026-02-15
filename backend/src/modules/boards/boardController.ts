import { FastifyRequest, FastifyReply } from "fastify";
import {
  createBoard,
  getMyBoards,
  getBoardById,
  addMemberToBoard,
} from "./boardService";

export async function createBoardHandler(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as any;
  const { name } = request.body as { name: string };

  const board = await createBoard(user.id, name);
  reply.send(board);
}

export async function getMyBoardsHandler(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as any;

  const boards = await getMyBoards(user.id);
  reply.send(boards);
}

export async function getBoardHandler(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as any;
  const { id } = request.params as { id: string };

  const board = await getBoardById(user.id, id);
  reply.send(board);
}

export async function addMemberHandler(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as any;
  const { id } = request.params as { id: string };
  const { userId } = request.body as { userId: string };

  const member = await addMemberToBoard(user.id, id, userId);
  reply.send(member);
}
