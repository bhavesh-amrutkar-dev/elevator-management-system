import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const PrismaClientSingleton = () => {
  return new PrismaClient({
    adapter: adapter
  })
}
declare const globalThis: {
  prismaGlobal: ReturnType<typeof PrismaClientSingleton>;

} & typeof global;
const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton()

export default prisma
if(process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma


// export const prisma = new PrismaClient({ adapter });