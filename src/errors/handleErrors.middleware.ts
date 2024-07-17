import { container, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";

import { AppError } from "./AppError";
import { ZodError } from "zod";

@injectable()
class HandleErrorsMiddleware {
  execute(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Response {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {
      return res.status(400).json(err.errors);
    }

    console.log(err);
    return res.status(500).json({ message: "Internal server error." });
  }
}

export const handleErrors = container.resolve(HandleErrorsMiddleware).execute;
