import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { ZodError } from "zod";

import { carReadOneControllerMock } from "../../../__mocks__/units/controllers";
import { prisma } from "../../../../database/prisma";
import { CarServices } from "../../../../services";
import { CarControllers } from "../../../../controllers";

describe("Unit tests: Read one car controller", () => {
  const { body, expectedValue } = carReadOneControllerMock;
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

  test("Should be able to read one car correctly", async () => {
    const car = await carTb.create({ data: body });

    req.params = { id: car.id };

    await controller.readOne(req as Request, res as Response);

    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expectedValue);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Should not be able to read one car with invalid id", async () => {
    req.params = { id: "invalid-id" };

    expect(async () => {
      await controller.readOne(req as Request, res as Response);
    }).rejects.toThrow(
      new ZodError([
        {
          code: "invalid_type",
          expected: "object",
          received: "null",
          path: [],
          message: "Expected object, received null",
        },
      ])
    );
  });
});
