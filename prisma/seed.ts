
import * as bcrypt from 'bcrypt'
import { UserStatus } from '../generated/prisma/client/enums';
import prisma from '../lib/prisma';
import { seedModules } from './seeds/modules.seed';
async function main() {
  console.log('🌱 Seeding started...')
  await prisma.role.createMany({
    data: [
      { name: "SUPER_ADMIN" },
      { name: "ADMIN" },
      { name: "USER" },
      { name: "CLIENT" }
    ],
    skipDuplicates: true
  });
  console.log('✅ Roles seeded')


  await seedModules();
  const superAdminRole = await prisma.role.findUnique({
    where: { name: 'SUPER_ADMIN' },
  })

  if (!superAdminRole) {
    throw new Error('SUPER_ADMIN role not found')
  }

  // 3️⃣ Check if super admin already exists
  const existingSuperAdmin = await prisma.user.findUnique({
    where: { email: process.env.SUPER_ADMIN_EMAIL },
  })

  if (existingSuperAdmin) {
    console.log('⚠️ Super Admin already exists. Skipping...')
    return
  }

  // 4️⃣ Hash password
  const hashedPassword = await bcrypt.hash(
    process.env.SUPER_ADMIN_PASSWORD as string,
    10
  )

  // 5️⃣ Create Super Admin
  await prisma.user.create({
    data: {
      name: process.env.SUPER_ADMIN_NAME as string,
      email: process.env.SUPER_ADMIN_EMAIL as string,
      password: hashedPassword,
      isEmailVerified: true,
      status: UserStatus.Active,
      roleId: superAdminRole.id,
      createdBy: 'SYSTEM',
    },
  })

  console.log('👑 Super Admin created successfully')


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