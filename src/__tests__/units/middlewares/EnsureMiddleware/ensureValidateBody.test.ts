import { NextFunction, Request, Response } from "express";

import { ensure } from "../../../../middlewares/ensure.middleware";
import {
  invalidBodyMock,
  validBodyMock,
  validSchemaMock,
} from "../../../__mocks__/units/middlewares/EnsureMiddleware";

describe("Unit tests: ensure.validateBody middleware", () => {
  const ensureValidateBody = ensure.validateBody(validSchemaMock);

  let req: Partial<Request> = {};
  let res: Partial<Response> = {};
  let next: NextFunction = jest.fn();

  beforeEach(() => {
    next = jest.fn();
  });

  test("Should be able to validate a body correctly", () => {
    const { body, expectedValue } = validBodyMock;

    req.body = body;

    ensureValidateBody(req as Request, res as Response, next);

    expect(req.body).toStrictEqual(expectedValue);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("Should not be able to validate with a invalid body", () => {
    const { body, expectedValue } = invalidBodyMock;

    req.body = body;

    expect(() => {
      ensureValidateBody(req as Request, res as Response, next);
    }).toThrow(expectedValue);
    expect(next).not.toHaveBeenCalled();
  });
});
