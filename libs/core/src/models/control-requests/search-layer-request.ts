import { HoverMarkerOptions } from '../hover-marker-options';
import { PointTuple } from 'leaflet';

export class SearchLayerRequest {
  //#region Properties

  public buffer = 256;

  public collisionMargin = 2;

  public marker = new HoverMarkerOptions();

  public paddingTopLeft: PointTuple = [20, 20];

  public paddingBottomRight: PointTuple = [20, 20];

  public updateResultsOnMapMove = true;

  //#endregion

  //#region Constructor

  public constructor(public readonly searchResponse: any) {}

  //#endregion
}
