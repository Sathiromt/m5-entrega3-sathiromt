import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { carDeleteControllerMock } from "../../../__mocks__/units/controllers";
import { prisma } from "../../../../database/prisma";
import { CarServices } from "../../../../services";
import { CarControllers } from "../../../../controllers";

describe("Unit tests: Delete car controller", () => {
  const { body } = carDeleteControllerMock;
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

  test("Should be able to delete a car correctly", async () => {
    const car = await carTb.create({ data: body });

    req.params = { id: car.id };

    await controller.delete(req as Request, res as Response);

    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith();

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(204);
  });

  test("Should not be able to delete a car with invalid id", async () => {
    req.params = { id: "invalid-id" };

    expect(async () => {
      await controller.delete(req as Request, res as Response);
    }).rejects.toThrow(PrismaClientKnownRequestError);
  });
});
