class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class ResourceExistsError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class ConflictError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { NotFoundError, ResourceExistsError, ValidationError, ConflictError };
