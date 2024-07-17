import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { carMock } from "../../../__mocks__/units/services";
import { prisma } from "../../../../database/prisma";
import { CarServices } from "../../../../services";

describe("Unit tests: Delete car service", () => {
  const { body } = carMock;
  const carTb = prisma.car;

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to delete a car correctly", async () => {
    const car = await carTb.create({ data: body });

    const carServices = new CarServices().delete;
    await carServices(car.id);
  });

  test("Should not be able to delete a car with invalid id", async () => {
    const carServices = new CarServices().delete;

    expect(async () => {
      await carServices("invalid-id");
    }).rejects.toThrow(PrismaClientKnownRequestError);
  });
});
