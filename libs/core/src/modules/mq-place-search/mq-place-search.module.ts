import { Injector, NgModule } from '@angular/core';
import { MQ_PLACE_SEARCH_SERVICE } from '../../constants/injectors';
import { MqPlaceSearchService } from './mq-place-search.service';

@NgModule({
  providers: [
    {
      provide: MQ_PLACE_SEARCH_SERVICE,
      useClass: MqPlaceSearchService,
      deps: [Injector],
    },
  ],
})
export class MqPlaceSearchModule {}
