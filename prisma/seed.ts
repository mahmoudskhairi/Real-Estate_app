import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  await prisma.activityLog.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.attachment.deleteMany()
  await prisma.claim.deleteMany()
  await prisma.clientProduct.deleteMany()
  await prisma.leadProduct.deleteMany()
  await prisma.client.deleteMany()
  await prisma.product.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Cleared existing data')

  // Create Users
  const adminPassword = await bcrypt.hash('admin123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@nexuserp.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  const supervisor = await prisma.user.create({
    data: {
      email: 'supervisor@nexuserp.com',
      password: userPassword,
      name: 'Sarah Johnson',
      role: 'SUPERVISOR',
    },
  })

  const operator1 = await prisma.user.create({
    data: {
      email: 'operator1@nexuserp.com',
      password: userPassword,
      name: 'Mike Chen',
      role: 'OPERATOR',
    },
  })

  const operator2 = await prisma.user.create({
    data: {
      email: 'operator2@nexuserp.com',
      password: userPassword,
      name: 'Emma Davis',
      role: 'OPERATOR',
    },
  })

  const clientUser1 = await prisma.user.create({
    data: {
      email: 'client1@example.com',
      password: userPassword,
      name: 'Alice Johnson',
      role: 'CLIENT',
    },
  })

  const clientUser2 = await prisma.user.create({
    data: {
      email: 'client2@example.com',
      password: userPassword,
      name: 'Bob Smith',
      role: 'CLIENT',
    },
  })

  console.log('✅ Created users')

  // Create Products (Real Estate)
  const villa = await prisma.product.create({
    data: {
      name: 'Luxury Villa in Malibu',
      type: 'real_estate',
      price: 12500000,
      metadata: {
        bedrooms: 6,
        bathrooms: 7,
        sqft: 8500,
        location: '123 Ocean Drive, Malibu, CA 90265',
        description: 'Stunning oceanfront villa with panoramic views, infinity pool, and private beach access.',
        images: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        ],
        features: ['Ocean View', 'Pool', 'Smart Home', 'Wine Cellar'],
      },
    },
  })

  const penthouse = await prisma.product.create({
    data: {
      name: 'Downtown Penthouse',
      type: 'real_estate',
      price: 4200000,
      metadata: {
        bedrooms: 4,
        bathrooms: 4,
        sqft: 4200,
        location: '456 City Tower, Los Angeles, CA 90012',
        description: 'Modern penthouse in the heart of downtown with floor-to-ceiling windows and rooftop terrace.',
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        ],
        features: ['City View', 'Rooftop Terrace', 'Concierge', 'Gym'],
      },
    },
  })

  const condo = await prisma.product.create({
    data: {
      name: 'Seaside Condo',
      type: 'real_estate',
      price: 850000,
      metadata: {
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1500,
        location: '789 Beach Blvd, Santa Monica, CA 90401',
        description: 'Cozy beachfront condo with modern finishes and ocean breeze.',
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        ],
        features: ['Beach Access', 'Balcony', 'Parking'],
      },
    },
  })

  console.log('✅ Created products')

  // Create Leads
  const lead1 = await prisma.lead.create({
    data: {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      phone: '+1-555-0101',
      status: 'NEW',
    },
  })

  const lead2 = await prisma.lead.create({
    data: {
      name: 'Diana Prince',
      email: 'diana@example.com',
      phone: '+1-555-0102',
      status: 'CONTACTED',
      operatorId: operator1.id,
    },
  })

  const lead3 = await prisma.lead.create({
    data: {
      name: 'Ethan Hunt',
      email: 'ethan@example.com',
      phone: '+1-555-0103',
      status: 'QUALIFIED',
      operatorId: operator2.id,
    },
  })

  const lead4 = await prisma.lead.create({
    data: {
      name: 'Fiona Gallagher',
      email: 'fiona@example.com',
      phone: '+1-555-0104',
      status: 'PROPOSAL',
      operatorId: operator1.id,
    },
  })

  console.log('✅ Created leads')

  // Create Clients
  const client1 = await prisma.client.create({
    data: {
      userId: clientUser1.id,
    },
  })

  const client2 = await prisma.client.create({
    data: {
      userId: clientUser2.id,
    },
  })

  console.log('✅ Created clients')

  // Assign Products to Clients
  await prisma.clientProduct.create({
    data: {
      clientId: client1.id,
      productId: villa.id,
    },
  })

  await prisma.clientProduct.create({
    data: {
      clientId: client2.id,
      productId: condo.id,
    },
  })

  console.log('✅ Assigned products to clients')

  // Create Claims
  const claim1 = await prisma.claim.create({
    data: {
      title: 'Leaking Roof',
      description: 'There is a leak in the master bedroom ceiling after the recent rain.',
      status: 'SUBMITTED',
      clientId: client1.id,
    },
  })

  const claim2 = await prisma.claim.create({
    data: {
      title: 'Broken HVAC',
      description: 'The air conditioning system is not working properly.',
      status: 'IN_REVIEW',
      clientId: client2.id,
      operatorId: operator1.id,
    },
  })

  console.log('✅ Created claims')

  // Create Comments
  await prisma.comment.create({
    data: {
      content: 'This lead looks promising. Following up tomorrow.',
      userId: operator1.id,
      leadId: lead2.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'We have scheduled a site visit for next week.',
      userId: operator1.id,
      claimId: claim2.id,
    },
  })

  console.log('✅ Created comments')

  console.log('\n🎉 Seed completed successfully!\n')
  console.log('📋 Sample Credentials:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('👤 Admin:')
  console.log('   Email: admin@nexuserp.com')
  console.log('   Password: admin123')
  console.log('\n👤 Supervisor:')
  console.log('   Email: supervisor@nexuserp.com')
  console.log('   Password: user123')
  console.log('\n👤 Operator:')
  console.log('   Email: operator1@nexuserp.com')
  console.log('   Password: user123')
  console.log('\n👤 Client:')
  console.log('   Email: client1@example.com')
  console.log('   Password: user123')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
