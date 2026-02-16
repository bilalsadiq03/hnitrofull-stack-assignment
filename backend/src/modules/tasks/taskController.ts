import { FastifyRequest, FastifyReply } from "fastify";
import { createTask, updateTask, deleteTask, moveTask } from "./taskService";

export async function createTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  const { listId, title, description } = request.body as {
    listId: string;
    title: string;
    description?: string;
  };

  const task = await createTask(listId, title, description);
  reply.send(task);
}

export async function updateTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { title, description } = request.body as { title?: string; description?: string };

  const task = await updateTask(id, { title, description });
  reply.send(task);
}

export async function deleteTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const task = await deleteTask(id);
  reply.send(task);
}

export async function moveTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { toListId, position } = request.body as { toListId: string; position: number };

  const task = await moveTask(id, toListId, position);
  reply.send(task);
}
