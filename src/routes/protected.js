import { prisma } from "../lib/prisma";
import { verifyJWT } from "../lib/utils";
import { z } from "zod";

export async function protectedRoute(app) {
  app.get("/users", { preHandler: verifyJWT }, async (request, reply) => {

    const bodySchema = z.object({
      user: z.any(),
    })
    
    const { user } = bodySchema.parse(request);
    console.log("user =====>", user);
    
    const users = await prisma.user.findMany();
    return reply.status(200).send({ users });
  });
}
