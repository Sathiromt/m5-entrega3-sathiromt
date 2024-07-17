import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import { carCreateControllerMock } from "../../../__mocks__/units/controllers";
import { prisma } from "../../../../database/prisma";
import { CarServices } from "../../../../services";
import { CarControllers } from "../../../../controllers";

describe("Unit tests: Create car controller", () => {
  const { body, expectedValue } = carCreateControllerMock;
  const carTb = prisma.car;

  container.registerSingleton("CarServices", CarServices);
  const controller = container.resolve(CarControllers);

  let req: Partial<Request> = {};
  let res: Partial<Response> = {};

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to create a car correctly", async () => {
    req.body = body;

    await controller.create(req as Request, res as Response);

    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expectedValue);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("Should not be able to create a car with invalid body", async () => {
    req.body = { brand: 1 } as any;

    expect(async () => {
      await controller.create(req as Request, res as Response);
    }).rejects.toThrow(PrismaClientValidationError);
  });
});
