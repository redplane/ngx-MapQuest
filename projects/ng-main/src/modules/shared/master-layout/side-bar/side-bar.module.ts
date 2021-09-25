import {NgModule} from '@angular/core';
import {SideBarComponent} from './side-bar.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        SideBarComponent
    ],
  imports: [
    TranslateModule,
    RouterModule
  ],
    exports: [
        SideBarComponent
    ]
})
export class SideBarModule {

}
