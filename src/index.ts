export class ResultError<Data> extends Error {
  private readonly result: Data;

  constructor(data: Data) {
    super();
    this.result = data;
  }

  unwrap(): Data {
    return this.result;
  }
}
