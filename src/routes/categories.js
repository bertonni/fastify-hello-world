import { prisma } from '../lib/prisma.js';

export async function categoriesRoute(app) {
  app.get("/categories", async (req, reply) => {
    try {
      const categories = await prisma.categories.findMany({
        select: {
          name: true
        },
        orderBy: {
          name: 'asc'
        }
      });

      return reply.status(200).send({ categories });
    } catch (error) {
      return reply.status(400).send({ message: 'Não foram encontradas categorias' })
    }
  });
}
 