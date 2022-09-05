import {MqStreetAddress} from './mq-street-address';

export class MqPlaceFeature {

  //#region Properties

  // A GeoJSON Geometry object representing this object geographically.
  public geometry: any;

  public properties: MqStreetAddress;

  // The GeoJSON type of this object
  public type: string;

  //#endregion

}
