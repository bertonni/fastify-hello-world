import { prisma } from "../lib/prisma.js";
import { verifyJWT } from "../lib/utils.js";

export async function getIncomesRoute(app) {
  app.get("/incomes/:userId", { preHandler: verifyJWT }, async (req, reply) => {
    try {
      const userId = req.params.userId;
      const incomes = await prisma.incomes.findMany({
        where: {
          userId,
        },
      });

      return reply.status(200).send({ incomes });
    } catch (error) {
      return reply
        .status(200)
        .send({ message: "Não foi possível buscar as receitas" });
    }
  });
}

export async function addIncomeRoute(app) {
  app.post("/incomes", { preHandler: verifyJWT }, async (req, reply) => {
    try {
      const { title, amount, reference, userId } = req.body;
      console.log("body ===============>", req.body);

      await prisma.incomes.create({
        data: {
          title,
          amount,
          reference,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return reply
        .status(200)
        .send({ message: "Receita incluída com sucesso" });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Nâo foi possível incluir a receita." });
    }
  });
}
