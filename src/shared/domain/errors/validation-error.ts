import { FieldsError } from '../validators/validators-fields.interface';

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public error: FieldsError) {
    super(`Entity validation Error: ${JSON.stringify(error)}`);
    this.name = 'EntityValidationError';
  }
}
