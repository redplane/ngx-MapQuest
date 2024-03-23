export class SatelliteControlOptions {
  //#region Constructor

  public constructor(
    public readonly position:
      | 'topleft'
      | 'topright'
      | 'bottomleft'
      | 'bottomright' = 'topright',
    public readonly mapType:
      | 'map'
      | 'hybrid'
      | 'satellite'
      | 'light'
      | 'dark' = 'hybrid',
    public readonly title: string = 'Satellite',
    public readonly className: string = ''
  ) {}

  //#endregion
}
