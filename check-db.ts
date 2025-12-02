import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function check() {
  console.log('Checking database...\n')
  
  const users = await prisma.user.findMany({
    select: { email: true, role: true, password: true }
  })
  
  console.log(`Found ${users.length} users:`)
  for (const user of users) {
    console.log(`- ${user.email} (${user.role})`)
  }
  
  console.log('\nTesting password for admin@nexuserp.com:')
  const admin = await prisma.user.findUnique({ 
    where: { email: 'admin@nexuserp.com' }
  })
  
  if (admin) {
    const testPassword = 'admin123'
    const isValid = await bcrypt.compare(testPassword, admin.password)
    console.log(`Password "${testPassword}" is ${isValid ? 'VALID ✓' : 'INVALID ✗'}`)
    console.log(`Stored hash: ${admin.password.substring(0, 30)}...`)
  } else {
    console.log('Admin user not found!')
  }
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
