import "reflect-metadata";
import "express-async-errors";
import express, { Application, json } from "express";
import helmet from "helmet";

import { carRouter } from "./routers";
import { handleErrors } from "./errors";

export const app: Application = express();

app.use(helmet());
app.use(json());

app.use("/cars", carRouter);

app.use(handleErrors);
