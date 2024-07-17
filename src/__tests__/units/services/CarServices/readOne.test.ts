import { Car } from "@prisma/client";

import { prisma } from "../../../../database/prisma";
import { CarServices } from "../../../../services";
import { carMock } from "../../../__mocks__/units/services";
import { carDefaultSpecs } from "../../../utils";
import { ZodError } from "zod";

describe("Unit tests: Read one car service", () => {
  const { body, expectedValue } = carMock;
  const carTb = prisma.car;

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to read one car correctly", async () => {
    const car = await carTb.create({ data: body });

    const carServices = new CarServices().readOne;
    const received = (await carServices(car.id)) as Car;

    carDefaultSpecs(received, expectedValue);
  });

  test("Should not be able to read a car with a invalid id", async () => {
    const carServices = new CarServices().readOne;

    expect(async () => await carServices("invalid-id")).rejects.toThrow(
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
