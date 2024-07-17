import { Car } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import { carMock } from "../../../__mocks__/units/services";
import { prisma } from "../../../../database/prisma";
import { CarServices } from "../../../../services";
import { carDefaultSpecs } from "../../../utils";

describe("Unit tests: Create car service", () => {
  const { body, expectedValue } = carMock;
  const carTb = prisma.car;

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to create a car correctly", async () => {
    const carServices = new CarServices().create;
    const received = (await carServices(body)) as Car;

    carDefaultSpecs(received, expectedValue);
  });

  test("Should not be able to create a car with invalid body", async () => {
    const carServices = new CarServices().create;

    expect(async () => {
      await carServices({} as any);
    }).rejects.toThrow(PrismaClientValidationError);
  });
});
