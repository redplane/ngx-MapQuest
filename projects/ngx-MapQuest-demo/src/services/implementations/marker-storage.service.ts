import {MqMarker} from '../../models/mq-marker';
import {v4 as uuid} from 'uuid';

export class MarkerStorageService {

  //#region Methods

  public loadMarkers(): MqMarker[] {
    const markers = [];

    const labourUniversity = new MqMarker(uuid(), {
      lat: 21.0050915,
      lng: 105.8259937
    }, {
      draggable: true
    });
    markers.push(labourUniversity);

    const vimecoCtFourTower = new MqMarker(uuid(),{
      lat: 21.003395,
      lng: 105.785127
    });
    markers.push(vimecoCtFourTower);

    const phuongDongUniversity = new MqMarker(uuid(),{
      lat: 21.013706,
      lng: 105.7916586
    });
    markers.push(phuongDongUniversity);

    return markers;
  }

  //#endregion

}
