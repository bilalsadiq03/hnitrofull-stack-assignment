import { prisma } from "../../plugins/prisma";

export async function createTask(listId: string, title: string, description?: string) {
  const count = await prisma.task.count({ where: { listId } });

  const task = await prisma.task.create({
    data: {
      title,
      description,
      listId,
      position: count,
    },
  });

  return task;
}

export async function updateTask(taskId: string, data: { title?: string; description?: string }) {
  return prisma.task.update({
    where: { id: taskId },
    data,
  });
}

export async function deleteTask(taskId: string) {
  return prisma.task.delete({
    where: { id: taskId },
  });
}

export async function moveTask(taskId: string, toListId: string, newPosition: number) {
  return prisma.task.update({
    where: { id: taskId },
    data: {
      listId: toListId,
      position: newPosition,
    },
  });
}
