export class MqMarker {
  //#region Constructor

  public constructor(
    public readonly id: string,
    public readonly coordinate: L.LatLngExpression,
    public readonly options?: L.MarkerOptions
  ) {}

  //#endregion
}
