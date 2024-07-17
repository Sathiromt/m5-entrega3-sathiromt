import { ZodError, z } from "zod";

const validSchemaMock = z.object({
  name: z.string(),
  brand: z.string(),
  year: z.number().gte(1900).lte(2024),
  km: z.number().gte(0).lte(100000),
});

const validBodyMock = {
  body: {
    name: "Carro 1",
    brand: "Brand 1",
    year: 2020,
    km: 0,
    extra: "extra",
  },
  expectedValue: {
    name: "Carro 1",
    brand: "Brand 1",
    year: 2020,
    km: 0,
  },
};

const invalidBodyMock = {
  body: {},
  expectedValue: ZodError,
};

export { validSchemaMock, validBodyMock, invalidBodyMock };
