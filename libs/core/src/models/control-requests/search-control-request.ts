export class SearchControlRequest {
  //#region Properties

  public readonly q?: string;

  public readonly category?: string[];

  public readonly location?: number[];

  public readonly circle?: number[];

  public readonly bbox?: number[];

  public readonly corridor?: number[];

  public readonly page?: number;

  public readonly pageSize?: number;

  //#endregion

  //#region Constructor

  public constructor(
    public readonly key: string,
    public readonly sort: 'distance' | 'relevance'
  ) {}

  //#endregion
}
