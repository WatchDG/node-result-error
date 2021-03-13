import { ResultError, resultError } from '../src';

test('instanceof Error', () => {
  const rError = new ResultError(null);
  expect(rError).toBeInstanceOf(Error);
});

test('unwrap null', () => {
  const rError = new ResultError(null);
  expect(rError.unwrap()).toBeNull();
});

test('unwrap undefined', () => {
  const rError = new ResultError(void 0);
  expect(rError.unwrap()).toBeUndefined();
});

test('unwrap object', () => {
  const rError = new ResultError({ statusCode: 200 });
  expect(rError.unwrap()).toHaveProperty('statusCode', 200);
});

test('resultError returns instanceof ResultError', () => {
  const rError = resultError(null);
  expect(rError).toBeInstanceOf(ResultError);
});