import {InjectionToken} from '@angular/core';
import {IMqMapKeyResolver} from '../services/interfaces/mq-map-key-resolver.interface';
import {IMqPlaceSearchService} from '../modules/mq-place-search/mq-place-search-service.interface';
import {MqSystemFile} from '../models';

// Map quest key resolver.
export const MAP_QUEST_KEY_RESOLVER_PROVIDER = new InjectionToken<IMqMapKeyResolver>('MAP_QUEST_KEY_RESOLVER_PROVIDER');

// Service providers.
export const MQ_PLACE_SEARCH_SERVICE_PROVIDER = new InjectionToken<IMqPlaceSearchService>('MQ_PLACE_SEARCH_SERVICE_PROVIDER');

// Necessary files provider.
export const MQ_SYSTEM_FILES_PROVIDER = new InjectionToken<MqSystemFile[]>('MQ_SYSTEM_FILES_PROVIDER');
export const MQ_MAP_HEAT_FILES_PROVIDER = new InjectionToken<MqSystemFile[]>('MQ_MAP_HEAT_FILES_PROVIDER');
