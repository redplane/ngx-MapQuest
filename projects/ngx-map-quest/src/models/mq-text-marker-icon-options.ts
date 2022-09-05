import {MQ_MARKER_ICON_SIZE} from '../constants/data-types';

export class MqTextMarkerIconOptions {

  //#region Properties

  // The string hex code primary color of the marker. Default is '#ffffff'.
  public primaryColor?: string;

  // The string hex code secondary color of the marker. Default is '#333333'.
  public secondaryColor?: string;

  // A boolean that determines if a shadow is rendered with the icon. Default is true.
  public shadow?: boolean;

  // The size of the marker as a string: 'sm', 'md', or 'lg'. Default is 'lg'.
  public size?: MQ_MARKER_ICON_SIZE;

  // The string symbol to be rendered inside the marker.
  // Can be a single letter or up to three numbers between 0 and 999. Not available with 'via' markers.
  public symbol?: string;

  //#endregion

}
