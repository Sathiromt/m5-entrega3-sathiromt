import "reflect-metadata";
import { container, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

import { prisma } from "../database/prisma";
import { AppError } from "../errors";

@injectable()
class EnsureMiddleware {
  validateBody(schema: AnyZodObject) {
    return (req: Request, _res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);

      return next();
    };
  }

  async isCarIdValid(req: Request, _res: Response, next: NextFunction) {
    const { id } = req.params;
    const car = await prisma.car.findUnique({ where: { id } });

    if (!car) throw new AppError(404, "Car not found.");

    return next();
  }
}

export const ensure = container.resolve(EnsureMiddleware);
