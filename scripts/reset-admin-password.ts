import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@nexuserp.com";
  const newPassword = process.env.ADMIN_PASSWORD || "Admin123!";

  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.error(`No user found with email: ${email}`);
      process.exit(1);
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { email }, data: { password: hash } });
    console.log(`Admin password reset for ${email}. New password: ${newPassword}`);
  } catch (err) {
    console.error("Error resetting admin password:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
