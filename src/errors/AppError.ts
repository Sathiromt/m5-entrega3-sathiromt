export class AppError extends Error {
  constructor(public statusCode = 400, public message: string) {
    super();
  }
}
