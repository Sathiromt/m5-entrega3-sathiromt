import { prisma } from "../../../../database/prisma";
import { carCreateServiceMock } from "../../../__mocks__/integrations/services";
import { carDefaultSpecs, request } from "../../../utils";

describe("Integration tests: Create car", () => {
  const { body, expectedValue } = carCreateServiceMock;
  const carTb = prisma.car;
  const route = "/cars";

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to create a car successfully", async () => {
    const response = await request
      .post(route)
      .send(body)
      .expect(201)
      .then((response) => response.body);

    carDefaultSpecs(response, expectedValue);
  });

  test("Should not be able to create a car with invalid body", async () => {
    const response = await request
      .post(route)
      .send({})
      .expect(400)
      .then((response) => response.body);

    expect(response).toStrictEqual([
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["name"],
        message: "Required",
      },
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["brand"],
        message: "Required",
      },
      {
        code: "invalid_type",
        expected: "number",
        received: "undefined",
        path: ["year"],
        message: "Required",
      },
      {
        code: "invalid_type",
        expected: "number",
        received: "undefined",
        path: ["km"],
        message: "Required",
      },
    ]);
  });
});
