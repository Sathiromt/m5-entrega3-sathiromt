import { z } from "zod";
import { Request, Response } from "express";
import { Car } from "@prisma/client";

import { carCreateSchema, carUpdateSchema, carReturnSchema } from "../schemas";

type CarCreate = z.infer<typeof carCreateSchema>;
type CarUpdate = z.infer<typeof carUpdateSchema>;
type CarReturn = z.infer<typeof carReturnSchema>;

interface CarServicesProps {
  create: (data: CarCreate) => Promise<CarReturn>;
  read: () => Promise<CarReturn[]>;
  readOne: (id: string) => Promise<CarReturn>;
  update: (id: string, data: CarUpdate) => Promise<CarReturn>;
  delete: (id: string) => Promise<void>;
}

interface CarControllersProps {
  create: (req: Request, res: Response) => Promise<Response>;
  read: (req: Request, res: Response) => Promise<Response>;
  readOne: (req: Request, res: Response) => Promise<Response>;
  update: (req: Request, res: Response) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
}

type CarDefaultSpecs = Car;

export {
  CarCreate,
  CarUpdate,
  CarReturn,
  CarServicesProps,
  CarControllersProps,
  CarDefaultSpecs,
};
