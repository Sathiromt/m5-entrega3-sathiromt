import { prisma } from "../../../../database/prisma";
import { carReadServiceMock } from "../../../__mocks__/integrations/services";
import { carDefaultSpecs, request } from "../../../utils";

describe("Integration tests: Read cars", () => {
  const { body, expectedValue } = carReadServiceMock;
  const carTb = prisma.car;
  const route = "/cars";

  beforeEach(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$transaction([carTb.deleteMany()]);
  });

  test("Should be able to read cars successfully", async () => {
    await carTb.createMany({ data: body });

    const response = await request
      .get(route)
      .send()
      .expect(200)
      .then((response) => response.body);

    expect(response).toHaveLength(expectedValue.length);
    carDefaultSpecs(response[0], expectedValue[0]);
    carDefaultSpecs(response[1], expectedValue[1]);
    carDefaultSpecs(response[2], expectedValue[2]);
    carDefaultSpecs(response[3], expectedValue[3]);
  });
});
