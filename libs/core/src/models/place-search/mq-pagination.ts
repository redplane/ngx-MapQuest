export class MqPagination {
  //#region Properties

  // A link that will return the next page of results. Link will be absent if there are no more results to show.
  public nextUrl?: string;

  // A link that will return the previous page of results. Link will be absent on first page of results
  public previousUrl?: string;

  //#endregion

  //#region Constructor

  public constructor(public readonly currentPage: number) {}

  //#endregion
}
