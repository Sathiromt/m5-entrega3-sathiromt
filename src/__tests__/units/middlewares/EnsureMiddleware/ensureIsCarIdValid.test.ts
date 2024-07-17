import { NextFunction, Request, Response } from "express";
import { Car } from "@prisma/client";

import { prisma } from "../../../../database/prisma";
import { ensure } from "../../../../middlewares/ensure.middleware";

describe("Unit tests: ensure.isCarIdValid middleware", () => {
  let car: Car;
  const carTb = prisma.car;

  let req: Partial<Request> = {};
  let res: Partial<Response> = {};
  let next: NextFunction = jest.fn();

  const carMock = {
    name: "Carro 1",
    brand: "Brand 1",
    description: "Description 1",
    year: 2021,
    km: 0,
  };

  beforeEach(async () => {
    next = jest.fn();
    car = await carTb.create({ data: carMock });
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to validate a car id correctly", async () => {
    req.params = { ...req.params, id: car.id };

    await ensure.isCarIdValid(req as Request, res as Response, next);

    expect(req.params.id).toStrictEqual(car.id);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("Should not be able to validate a car id with invalid id", async () => {
    req.params = { ...req.params, id: "invalid" };

    expect(async () => {
      await ensure.isCarIdValid(req as Request, res as Response, next);
    }).rejects.toThrow("Car not found.");
  });
});
