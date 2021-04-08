export class ResultError<DataType, MetadataType> extends Error {
  private readonly result: DataType;
  private readonly _metadata?: MetadataType;

  constructor(data: DataType, metadata?: MetadataType) {
    super();
    this.result = data;
    this._metadata = metadata;
  }

  unwrap(): DataType {
    return this.result;
  }

  metadata(): MetadataType | undefined {
    return this._metadata;
  }
}

export const resultError = <DataType, MetadataType>(data: DataType, metadata?: MetadataType) =>
  new ResultError(data, metadata);
