import { TransformFnParams } from 'class-transformer';

export default function paramToArray({
  value,
}: TransformFnParams): string[] | unknown[] | undefined {
  if (value == undefined) {
    return undefined;
  }

  if (typeof value === 'string') {
    return [value];
  }

  if (Array.isArray(value)) {
    return value as unknown[];
  }

  return undefined;
}
