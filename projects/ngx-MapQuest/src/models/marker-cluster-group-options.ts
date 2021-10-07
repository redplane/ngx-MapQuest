import {LayerOptions, PolylineOptions} from 'leaflet';

export interface MarkerClusterGroupOptions extends LayerOptions {
  /*
  * When you mouse over a cluster it shows the bounds of its markers.
  */
  showCoverageOnHover?: boolean | undefined;

  /*
  * When you click a cluster we zoom to its bounds.
  */
  zoomToBoundsOnClick?: boolean | undefined;

  /*
  * When you click a cluster at the bottom zoom level we spiderfy it
  * so you can see all of its markers.
  */
  spiderfyOnMaxZoom?: boolean | undefined;

  /*
  * Clusters and markers too far from the viewport are removed from the map
  * for performance.
  */
  removeOutsideVisibleBounds?: boolean | undefined;

  /*
  * Smoothly split / merge cluster children when zooming and spiderfying.
  * If L.DomUtil.TRANSITION is false, this option has no effect (no animation is possible).
  */
  animate?: boolean | undefined;

  /*
  * If set to true (and animate option is also true) then adding individual markers to the
  * MarkerClusterGroup after it has been added to the map will add the marker and animate it
  * into the cluster. Defaults to false as this gives better performance when bulk adding markers.
  * addLayers does not support this, only addLayer with individual Markers.
  */
  animateAddingMarkers?: boolean | undefined;

  /*
  * If set, at this zoom level and below markers will not be clustered. This defaults to disabled.
  */
  disableClusteringAtZoom?: number | undefined;

  /*
  * The maximum radius that a cluster will cover from the central marker (in pixels). Default 80.
  * Decreasing will make more, smaller clusters. You can also use a function that accepts
  * the current map zoom and returns the maximum cluster radius in pixels
  */
  maxClusterRadius?: number | ((zoom: number) => number) | undefined;

  /*
  * Options to pass when creating the L.Polygon(points, options) to show the bounds of a cluster.
  * Defaults to empty
  */
  polygonOptions?: PolylineOptions | undefined;

  /*
  * If set to true, overrides the icon for all added markers to make them appear as a 1 size cluster.
  */
  singleMarkerMode?: boolean | undefined;

  /*
  * Allows you to specify PolylineOptions to style spider legs.
  * By default, they are { weight: 1.5, color: '#222', opacity: 0.5 }.
  */
  spiderLegPolylineOptions?: PolylineOptions | undefined;

  /*
  * Increase from 1 to increase the distance away from the center that spiderfied markers are placed.
  * Use if you are using big marker icons (Default: 1).
  */
  spiderfyDistanceMultiplier?: number | undefined;

  /*
  * Map pane where the cluster icons will be added.
  * Defaults to L.Marker's default (currently 'markerPane')
   */
  clusterPane?: string | undefined;

  /*
  * Boolean to split the addLayers processing in to small intervals so that the page does not freeze.
  */
  chunkedLoading?: boolean | undefined;

  /*
  * Time delay (in ms) between consecutive periods of processing for addLayers. Default to 50ms.
  */
  chunkDelay?: number | undefined;

  /*
  * Time interval (in ms) during which addLayers works before pausing to let the rest of the page process.
  * In particular, this prevents the page from freezing while adding a lot of markers. Defaults to 200ms.
  */
  chunkInterval?: number | undefined;

  /*
  * Callback function that is called at the end of each chunkInterval.
  * Typically used to implement a progress indicator. Defaults to null.
  */
  chunkProgress?: ((processedMarkers: number, totalMarkers: number, elapsedTime: number) => void) | undefined;
}
