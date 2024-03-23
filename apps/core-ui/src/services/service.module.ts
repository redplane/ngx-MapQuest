import { ModuleWithProviders, NgModule } from '@angular/core';
import { UiService } from './implementations/ui.service';
import { SERVICE__UI } from '../constants/app-injection-tokens';
import { MqMapKeyResolver } from './implementations/mq-map-key.resolver';
import { MarkerStorageService } from './implementations/marker-storage.service';
import { MAP_QUEST_KEY_RESOLVER } from 'ngx-map-quest';
import { TextMarkerStorageService } from './implementations/text-marker-storage.service';
import { HeatLayerPointService } from './implementations/heat-layer-point.service';
import { MarkerClusterGroupStorageService } from './implementations/marker-cluster-group-storage.service';

@NgModule({})
export class ServiceModule {
  //#region Methods

  static forRoot(): ModuleWithProviders<ServiceModule> {
    return {
      ngModule: ServiceModule,
      providers: [
        { provide: SERVICE__UI, useClass: UiService },
        {
          provide: MAP_QUEST_KEY_RESOLVER,
          useClass: MqMapKeyResolver,
        },
        MarkerStorageService,
        TextMarkerStorageService,
        HeatLayerPointService,
        MarkerClusterGroupStorageService,
      ],
    };
  }

  //#endregion
}
