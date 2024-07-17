import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

import { carUpdateControllerMock } from "../../../__mocks__/units/controllers";
import { prisma } from "../../../../database/prisma";
import { CarServices } from "../../../../services";
import { CarControllers } from "../../../../controllers";

describe("Unit tests: Update car controller", () => {
  const { payload, body, expectedValue } = carUpdateControllerMock;
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

  test("Should be able to update a car correctly", async () => {
    const car = await carTb.create({ data: payload });

    req = { ...req, body: body, params: { id: car.id } };

    await controller.update(req as Request, res as Response);

    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ ...expectedValue, id: car.id });

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Should not be able to update a car with invalid body", async () => {
    const car = await carTb.create({ data: payload });

    req = { ...req, body: { ...body, brand: 1 }, params: { id: car.id } };

    expect(async () => {
      await controller.update(req as Request, res as Response);
    }).rejects.toThrow(PrismaClientValidationError);
  });

  test("Should not be able to update a car with invalid id", async () => {
    req = { ...req, body: body, params: { id: "invalid-id" } };

    expect(async () => {
      await controller.update(req as Request, res as Response);
    }).rejects.toThrow(PrismaClientKnownRequestError);
  });
});
