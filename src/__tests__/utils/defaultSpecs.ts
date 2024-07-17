import { Car } from "@prisma/client";
import { CarDefaultSpecs } from "../../interfaces";

export const carDefaultSpecs = (
  received: CarDefaultSpecs,
  expectedValues: Car
) => {
  expect(received.id).toBeDefined();
  expect(received.name).toBe(expectedValues.name);
  expect(received.description).toBe(expectedValues.description);
  expect(received.brand).toBe(expectedValues.brand);
  expect(received.year).toBe(expectedValues.year);
  expect(received.km).toBe(expectedValues.km);
};
