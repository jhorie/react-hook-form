import { FieldError, FieldErrors, FieldValues } from '../types';
export default function schemaErrorLookup(errors: FieldErrors, _fields: FieldValues, name: string): {
    error?: FieldError;
    name: string;
};
