// require('dotenv').config();
import dotenv from "dotenv";
import fastify from "fastify";
import { fastifyCors } from '@fastify/cors';
import { protectedRoute } from "./src/routes/protected.js";
import { authRoute } from "./src/routes/auth.js";
import { userDataRoute } from "./src/routes/user.js";
import { categoriesRoute } from "./src/routes/categories.js";
import { expensesRoute } from "./src/routes/expenses.js";
import { incomesRoute } from "./src/routes/incomes.js";

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
app.register(categoriesRoute);
app.register(expensesRoute);
app.register(incomesRoute);

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
