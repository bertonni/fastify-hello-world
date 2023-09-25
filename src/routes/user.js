import { verifyJWT } from "../lib/utils.js";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";

export async function userDataRoute(app) {
  app.get("/me/:id", { preHandler: verifyJWT }, async (request, reply) => {
    
    const bodySchema = z.object({
      id: z.string()
    })
    
    try {
      const { id } = bodySchema.parse(request.params);
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id
        }
      });
      return reply.status(200).send({ user });
    } catch (error) {
      return reply.status(400).send({ message: error })
    }

  });
}
