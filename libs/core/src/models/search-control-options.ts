import { HoverMarkerOptions } from './hover-marker-options';
import { SearchControlRequest } from './control-requests/search-control-request';
import { SearchLayerRequest } from './control-requests/search-layer-request';
import { SearchInputOptions } from './search-input-options';

export class SearchControlOptions {
  //#region Constructor

  public constructor(
    public readonly className?: string,
    public readonly hoverMarker: HoverMarkerOptions = new HoverMarkerOptions(),
    public readonly search?: SearchControlRequest,
    public readonly searchLayer?: SearchLayerRequest,
    public readonly searchInput: SearchInputOptions = new SearchInputOptions()
  ) {}

  //#endregion
}
