import { prisma } from "../../plugins/prisma";

export async function createBoard(userId: string, name: string) {
  const board = await prisma.board.create({
    data: {
      name,
      ownerId: userId,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
  });

  return board;
}

export async function getMyBoards(userId: string) {
  return prisma.board.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      owner: true,
    },
  });
}

export async function getBoardById(userId: string, boardId: string) {
  const board = await prisma.board.findFirst({
    where: {
      id: boardId,
      members: {
        some: { userId },
      },
    },
    include: {
      members: {
        include: { user: true },
      },
      owner: true,
    },
  });

  if (!board) {
    throw new Error("Board not found or access denied");
  }

  return board;
}

export async function addMemberToBoard(
  requesterId: string,
  boardId: string,
  userIdToAdd: string
) {
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board) throw new Error("Board not found");

  if (board.ownerId !== requesterId) {
    throw new Error("Only owner can add members");
  }

  const member = await prisma.boardMember.create({
    data: {
      boardId,
      userId: userIdToAdd,
      role: "MEMBER",
    },
  });

  return member;
}
