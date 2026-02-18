import { prisma } from "lib/prisma";

async function main() {
  await prisma.role.createMany({
    data: [
      { name: "SUPER_ADMIN" },
      { name: "ADMIN" },
      { name: "USER" },
      { name: "CLIENT" }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });