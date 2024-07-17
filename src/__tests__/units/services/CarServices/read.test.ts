import { Car } from "@prisma/client";

import { prisma } from "../../../../database/prisma";
import { CarServices } from "../../../../services";
import { carListMock } from "../../../__mocks__/units/services";
import { carDefaultSpecs } from "../../../utils";

describe("Unit test: Read car service", () => {
  const { body, expectedValues } = carListMock;
  const carTb = prisma.car;

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to read cars correctly", async () => {
    await carTb.createMany({ data: body });

    const carServices = new CarServices().read;
    const received = (await carServices()) as Car[];

    expect(received).toHaveLength(expectedValues.length);

    carDefaultSpecs(received[0], expectedValues[0]);
    carDefaultSpecs(received[1], expectedValues[1]);
    carDefaultSpecs(received[2], expectedValues[2]);
    carDefaultSpecs(received[3], expectedValues[3]);
  });
});
