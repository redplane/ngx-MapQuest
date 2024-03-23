import {
  MQ_TEXT_MARKER_ICON_TYPE,
  MQ_TEXT_MARKER_POSITION,
} from '../constants/data-types';
import { MqTextMarkerIconOptions } from './mq-text-marker-icon-options';

export class MqTextMarkerOptions {
  //#region Properties

  // Text that appears next to the marker (no text by default).
  public text?: string;

  // Text that appears next to the marker below and with smaller font than the text (no subtext by default).
  public subtext?: string;

  // The position of the text and subtext relative to the marker. The available options are 'right', 'left', 'top', and 'bottom'.
  public position?: MQ_TEXT_MARKER_POSITION;

  // A string that specifies the type of icon to be rendered. The available options are 'marker', 'via', and 'circle'.
  public type?: MQ_TEXT_MARKER_ICON_TYPE;

  // An object containing any of the following key value options: primaryColor, secondaryColor, shadow, size, and symbol.
  public icon?: MqTextMarkerIconOptions;

  // Text for the browser tooltip that appear on marker hover (no tooltip by default).
  public title?: string;

  // Text for the alt attribute of the icon image (useful for accessibility).
  public alt?: string;

  // Determines whether the marker is draggable with mouse/touch.
  public draggable?: boolean;

  //#endregion
}
