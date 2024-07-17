import { prisma } from "../../../../database/prisma";
import { carUpdateServiceMock } from "../../../__mocks__/integrations/services";
import { carDefaultSpecs, request } from "../../../utils";

describe("Integration tests: Update car", () => {
  const { payload, body, expectedValue } = carUpdateServiceMock;
  const carTb = prisma.car;
  const route = "/cars";

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to update a car successfully", async () => {
    const car = await carTb.create({ data: payload });

    const response = await request
      .patch(`${route}/${car.id}`)
      .send(body)
      .expect(200)
      .then((response) => response.body);

    carDefaultSpecs(response, expectedValue);
  });

  test("Should not be able to update a car with invalid body", async () => {
    const car = await carTb.create({ data: payload });

    const response = await request
      .patch(`${route}/${car.id}`)
      .send({ year: "invalid" })
      .expect(400)
      .then((response) => response.body);

    expect(response).toStrictEqual([
      {
        code: "invalid_type",
        expected: "number",
        message: "Expected number, received string",
        path: ["year"],
        received: "string",
      },
    ]);
  });

  test("Should not be able to update a car with invalid id", async () => {
    const response = await request
      .patch(`${route}/invalid-id`)
      .send(body)
      .expect(404)
      .then((response) => response.body);

    expect(response.message).toStrictEqual("Car not found.");
  });
});
