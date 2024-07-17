import { z } from "zod";

const carSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  brand: z.string(),
  year: z.number().gte(1900).lte(2024),
  km: z.number().gte(0).lte(100000),
});

const carCreateSchema = carSchema.omit({ id: true });
const carUpdateSchema = carCreateSchema.partial();
const carReturnSchema = carSchema;

export { carCreateSchema, carUpdateSchema, carReturnSchema };
