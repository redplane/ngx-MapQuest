import {NgModule} from '@angular/core';
import {HomePageRoutingModule} from './home-page-routing.module';
import {ContentPageModule} from '../../shared/content-page/content-page.module';
import {CONTENT_PAGE_SERVICE} from '../../../constants/injectors';
import {HomePageService} from './home-page.service';

@NgModule({
  imports: [
    ContentPageModule,
    HomePageRoutingModule
  ],
  providers: [
    {
      provide: CONTENT_PAGE_SERVICE,
      useClass: HomePageService
    }
  ]
})
export class HomePageModule {

}
