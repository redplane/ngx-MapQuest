export class MqPlaceSearchResult {

  //#region Properties

  // The internal MapQuest id for the place.
  public id: string;

  // A longer, displayable name for the place, minimally including the name.
  public displayString: string;

  // The ISO 639-1 language code for the record.
  public language: string;

  // A simple name for the place
  public name: string;

  // A path fragment for accessing the item on mapquest.com
  public slug: string;

  //#endregion

}
