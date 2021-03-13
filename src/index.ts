export class ResultError<D> extends Error {
  private readonly result: D;

  constructor(data: D) {
    super();
    this.result = data;
  }

  unwrap(): D {
    return this.result;
  }
}

export const resultError = <D>(data: D) => new ResultError(data);
