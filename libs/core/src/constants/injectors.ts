import { InjectionToken } from '@angular/core';
import { IMqMapKeyResolver } from '../services/interfaces/mq-map-key-resolver.interface';
import { IMqPlaceSearchService } from '../modules/mq-place-search/mq-place-search-service.interface';
import { MqSystemFile } from '../models';

// Map quest key resolver.
export const MAP_QUEST_KEY_RESOLVER = new InjectionToken<IMqMapKeyResolver>(
  'MAP_QUEST_KEY_RESOLVER'
);

// Service providers.
export const MQ_PLACE_SEARCH_SERVICE =
  new InjectionToken<IMqPlaceSearchService>('MQ_PLACE_SEARCH_SERVICE');

// Necessary files provider.
export const MQ_MAP_REQUIRED_FILES = new InjectionToken<MqSystemFile[]>(
  'MQ_MAP_REQUIRED_FILES'
);
export const MQ_HEAT_LAYER_REQUIRED_FILES = new InjectionToken<MqSystemFile[]>(
  'MQ_HEAT_LAYER_REQUIRED_FILES'
);
export const MQ_MARKER_CLUSTER_GROUP_REQUIRED_FILES = new InjectionToken<
  MqSystemFile[]
>('MQ_MARKER_CLUSTER_GROUP_REQUIRED_FILES');
