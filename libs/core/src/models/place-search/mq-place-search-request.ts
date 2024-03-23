import { MQ_PLACE_SEARCH_SORT } from '../../constants';

export class MqPlaceSearchRequest {
  //#region Optional properties

  // A geographic context used for searching, ranking, and ordering results.
  // Must consist of two comma-separated floating-point values:
  // the longitude, latitude; the first coordinate must lie in the range [-180, 180],
  // and the second must lie in the range [-90, 90]. Note: 'sort=distance' requires a location;
  // if bounding with a circle/bbox and no location is specified,
  // the center of the circle/bbox will be used by default.
  public location?: number[];

  // The categories of places to search over.
  // Must consist of a comma-separated list of values, specified with 'sic:' followed by the alphanumeric code.
  // Valid codes include any 'sic' values returned by the Search Ahead API,
  // as well as six-digit North American Industry Classification System (NAICS) codes.
  // Required if q is not specified.
  public category?: string[];

  // Feedback.
  public feedback?: boolean;

  // A geographic circle used to bound the search. Only places within the bound will be returned in results.
  // Must consist of three comma-separated floating-point values: the longitude and latitude of the circle's center,
  // and the radius in meters; the first coordinate must lie in the range [-180, 180],
  // the second must lie in the range [-90, 90], and the radius must lie in the range [0, 800000].
  // Note: only one of 'circle' and 'bbox' may be specified.
  public circle?: number[];

  // A geographic rectangle used to bound the search.
  // Only places within the bound will be returned in results.
  // Must consist of four comma-separated floating-point values: the longitude and latitude of
  // the lower-left corner followed by the longitude and latitude of the upper-right corner;
  // longitudes must lie in the range [-180, 180], and latitudes must lie in the range [-90, 90].
  // Note: only one of 'circle' and 'bbox' may be specified.
  public bbox?: number[];

  // A collection of points defining a route used for the search.
  // Must consist of two or more arrays of floating-point longitude, latitude values.
  // Longitudes must lie in the range [-180, 180], and latitudes must lie in the range [-90, 90].
  // Example: [-120.5,10.1],[-119.4,10.3] Note: Corridor cannot be used with 'location' or 'sort=distance'.
  public corridor?: Array<Array<number>>;

  // The number of results to return per page. Must lie in the range [1, 50].
  // Default if unspecified: 10.
  // Note: the starting result number on the requested page must be between 1 and 500,
  // so the maximum allowed value for 'pageSize' could in practice be less than 50,
  // depending on the value of 'page'.
  public pageSize?: number;

  // he page within the result set to return, where 'pageSize' determines the page size.
  // Must lie in the range [1, 500], and the starting result number on the requested page
  // must be between 1 and 500. Default if unspecified: 1.
  public page?: number;

  // A query phrase. Results returned from the Points of Interest dataset
  // will best match the provided query phrase (string) and location (if provided).
  // Required if a category is not specified. Examples: 'Starbucks, Denver CO' or 'hotels'
  public q?: string;

  //#endregion

  //#region Required properties

  // The scheme used to order results. Must be 'distance' or 'relevance'.
  // Note: 'sort=distance' requires a location; if bounding with a circle/bbox and no location is specified,
  // the center of the circle/bbox will be used by default.
  // If a location is detected in the 'q' parameter with 'sort=relevance',
  // the location may influence relevance scoring. 'sort=importance' was available
  // as a sorting option in the initial version of the API, but this option has been deprecated
  // in favor of 'sort=relevance'. 'sort=importance' will be unavailable after 3/31/18;
  // API implementers using 'sort=importance' should migrate to 'sort=relevance'.
  public readonly sort: MQ_PLACE_SEARCH_SORT;

  //#endregion

  //#region Constructor

  public constructor(sort: MQ_PLACE_SEARCH_SORT) {
    this.sort = sort;
  }

  //#endregion
}
