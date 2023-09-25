// require('dotenv').config();
import dotenv from "dotenv";
import fastify from "fastify";
import { fastifyCors } from '@fastify/cors';
import { protectedRoute } from "./src/routes/protected";
import { authRoute } from "./src/routes/auth";
import { userDataRoute } from "./src/routes/user";

dotenv.config();

const app = fastify({
  logger: true,
});

const port = parseInt(process.env.SERVER_PORT) || 3000;
const host = "RENDER" in process.env ? `0.0.0.0` : `0.0.0.0`;

app.register(fastifyCors, {
  origin: "*",
});

app.register(authRoute);

app.register(protectedRoute);
app.register(userDataRoute);

app.listen(
  {
    host,
    port,
  },
  (err, _address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  }
);
