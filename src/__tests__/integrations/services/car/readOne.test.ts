import { prisma } from "../../../../database/prisma";
import { carReadOneServiceMock } from "../../../__mocks__/integrations/services";
import { carDefaultSpecs, request } from "../../../utils";

describe("Integration tests: Read one car", () => {
  const { body, expectedValue } = carReadOneServiceMock;
  const carTb = prisma.car;
  const route = "/cars";

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to read a car successfully", async () => {
    const car = await carTb.create({ data: body });

    const response = await request
      .get(`${route}/${car.id}`)
      .send()
      .expect(200)
      .then((response) => response.body);

    carDefaultSpecs(response, expectedValue);
  });

  test("Should not be able to read a car with invalid id", async () => {
    const response = await request
      .get(`${route}/invalid-id`)
      .send()
      .expect(404)
      .then((response) => response.body);

    expect(response.message).toStrictEqual("Car not found.");
  });
});
