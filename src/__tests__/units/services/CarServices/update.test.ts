import { Car } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

import { prisma } from "../../../../database/prisma";
import { CarServices } from "../../../../services";
import { carMock, carUpdateMock } from "../../../__mocks__/units/services";
import { carDefaultSpecs } from "../../../utils";

describe("Unit tests: Update car service", () => {
  const { body, expectedValue } = carUpdateMock;
  const carTb = prisma.car;

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to update a car correctly", async () => {
    const car = await carTb.create({ data: carMock.body });

    const carServices = new CarServices().update;
    const received = (await carServices(car.id, body)) as Car;

    carDefaultSpecs(received, expectedValue);
  });

  test("Should not be able to update a car with invalid body", async () => {
    const car = await carTb.create({ data: carMock.body });

    const carServices = new CarServices().update;

    expect(async () => {
      (await carServices(car.id, { brand: 1 } as any)) as Car;
    }).rejects.toThrow(PrismaClientValidationError);
  });

  test("Should not be able to update a car with invalid id", async () => {
    const carServices = new CarServices().update;

    expect(async () => {
      (await carServices("invalid-id", body)) as Car;
    }).rejects.toThrow(PrismaClientKnownRequestError);
  });
});
