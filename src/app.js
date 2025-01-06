import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

if (process.env.NODE_ENV !== "production") {
  import("dotenv").then((dotenv) => dotenv.config());
}
console.log(`./docs/**/*.yaml`);
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API da AdoptMe",
      description: "API for my application",
    },
  },
  apis: [`./docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO = process.env.MONGO_URI
console.log("AAAAAA",MONGO)
mongoose.connect(MONGO);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
