import { Hono } from 'hono'
import prisma from '../db'
import { authMiddleware, roleMiddleware } from '../middleware/auth'

const analytics = new Hono()

analytics.use('*', authMiddleware)

// GET /api/analytics/income-breakdown
analytics.get('/income-breakdown', roleMiddleware(['ADMIN', 'SUPERVISOR']), async (c) => {
  try {
    const incomeByClient = await prisma.client.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    const result = incomeByClient.map(client => {
      const totalIncome = client.products.reduce((sum, clientProduct) => {
        return sum + Number(clientProduct.product.price);
      }, 0);

      return {
        clientId: client.id,
        clientName: client.user.name,
        clientEmail: client.user.email,
        totalIncome,
        numberOfProducts: client.products.length,
      };
    });

    return c.json(result);
  } catch (error) {
    console.error('Error fetching income breakdown:', error);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

export default analytics;
