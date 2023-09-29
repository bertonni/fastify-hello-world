import { prisma } from "../lib/prisma.js";
import { verifyJWT } from "../lib/utils.js";

export async function getExpensesRoute(app) {
  app.get(
    "/expenses/:userId",
    { preHandler: verifyJWT },
    async (req, reply) => {
      try {
        const userId = req.params.id;
        const expenses = await prisma.expenses.findMany({
          where: {
            userId,
          },
        });

        return reply.status(200).send({ expenses });
      } catch (error) {
        return reply
          .status(200)
          .send({ message: "Não foi possível buscar as despesas" });
      }
    }
  );
}

export async function addEpenseRoute(app) {
  app.post("/expenses", { preHandler: verifyJWT }, async (req, reply) => {
    try {
      const {
        category,
        date,
        paymentMethod,
        installments,
        title,
        amount,
        reference,
        userId,
      } = req.body;

      await prisma.expenses.create({
        data: {
          date,
          category,
          installments,
          paymentMethod,
          amount,
          reference,
          title,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return reply
        .status(200)
        .send({ message: "Despesa incluída com sucesso" });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Nâo foi possível incluir a despesa." });
    }
  });
}
