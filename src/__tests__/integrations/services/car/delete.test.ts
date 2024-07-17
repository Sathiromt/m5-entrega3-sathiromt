import { prisma } from "../../../../database/prisma";
import { carDeleteServiceMock } from "../../../__mocks__/integrations/services";
import { request } from "../../../utils";

describe("Integration tests: Delete car", () => {
  const { body } = carDeleteServiceMock;
  const carTb = prisma.car;
  const route = "/cars";

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to delete a car successfully", async () => {
    const car = await carTb.create({ data: body });

    const response = await request
      .delete(`${route}/${car.id}`)
      .send()
      .expect(204)
      .then((response) => response.body);

    expect(response).toStrictEqual({});
  });

  test("Should not be able to delete a car with invalid id", async () => {
    const response = await request
      .get(`${route}/invalid-id`)
      .send()
      .expect(404)
      .then((response) => response.body);

    expect(response.message).toStrictEqual("Car not found.");
  });
});
