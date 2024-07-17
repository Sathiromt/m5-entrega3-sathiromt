import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";

import { carReadControllerMock } from "../../../__mocks__/units/controllers";
import { prisma } from "../../../../database/prisma";
import { CarServices } from "../../../../services";
import { CarControllers } from "../../../../controllers";

describe("Unit tests: Read cars controller", () => {
  const { body, expectedValue } = carReadControllerMock;
  const carTb = prisma.car;

  container.registerSingleton("CarServices", CarServices);
  const controller = container.resolve(CarControllers);

  let req: Partial<Request> = {};
  let res: Partial<Response> = {};

  beforeEach(async () => {
    await carTb.createMany({ data: body });

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to read a car correctly", async () => {
    await controller.read(req as Request, res as Response);

    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expectedValue);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
