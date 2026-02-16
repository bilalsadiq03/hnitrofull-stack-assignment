import { prisma } from "../../plugins/prisma";

export async function createList(boardId: string, title: string) {
  const count = await prisma.list.count({ where: { boardId } });

  const list = await prisma.list.create({
    data: {
      title,
      boardId,
      position: count,
    },
  });

  return list;
}
