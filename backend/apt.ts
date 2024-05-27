import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function countOnlineMembers() {
  const onlineMembers = await prisma.signUp.count({
    where: {
      OR: [{ loggedOut: null }, { loggedOut: { lt: prisma.signUp.createdAt } }],
    },
  });
  return onlineMembers;
}

module.exports = { countOnlineMembers };
