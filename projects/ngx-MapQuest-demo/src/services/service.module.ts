import {ModuleWithProviders, NgModule} from '@angular/core';
import {AccountService} from './implementations/account.service';
import {AuthenticationService} from './implementations/authentication.service';
import {UiService} from './implementations/ui.service';
import {MqMapKeyResolver} from './implementations/mq-map-key.resolver';
import {MarkerStorageService} from './implementations/marker-storage.service';
import {MAP_QUEST_KEY_RESOLVER_PROVIDER} from 'ngx-MapQuest';
import {TextMarkerStorageService} from './implementations/text-marker-storage.service';
import {HeatLayerPointService} from './implementations/heat-layer-point.service';
import {MarkerClusterGroupStorageService} from './implementations/marker-cluster-group-storage.service';

@NgModule({})

export class ServiceModule {

  //#region Methods

  static forRoot(): ModuleWithProviders<ServiceModule> {
    return {
      ngModule: ServiceModule,
      providers: [
        {
          provide: MAP_QUEST_KEY_RESOLVER_PROVIDER,
          useClass: MqMapKeyResolver
        },
        MarkerStorageService,
        TextMarkerStorageService,
        HeatLayerPointService,
        MarkerClusterGroupStorageService
      ]
    };
  }

  //#endregion
}


