import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";

import { CarServices } from "../services";

@injectable()
export class CarControllers {
  constructor(@inject("CarServices") private carServices: CarServices) {}

  async create(req: Request, res: Response): Promise<Response> {
    const car = await this.carServices.create(req.body);

    return res.status(201).json(car);
  }

  async read(_req: Request, res: Response): Promise<Response> {
    const cars = await this.carServices.read();

    return res.status(200).json(cars);
  }

  async readOne(req: Request, res: Response): Promise<Response> {
    const car = await this.carServices.readOne(req.params.id);

    return res.status(200).json(car);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const car = await this.carServices.update(req.params.id, req.body);

    return res.status(200).json(car);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    await this.carServices.delete(req.params.id);

    return res.status(204).json();
  }
}
