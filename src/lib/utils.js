import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export async function verifyJWT(
  request,
  reply,
  next
) {
  const token = request.headers.authorization;

  if (!token) {
    reply.code(401).send({ message: 'Token não fornecido' })
    next(new Error('Token não fornecido'));
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next()
  } catch (error) {
    reply.code(401).send({ message: 'Token inválido.' });
    return;
  }
}
