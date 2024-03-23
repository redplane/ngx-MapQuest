import { NgModule } from '@angular/core';
import { SearchControlDirective } from './search-control.directive';

@NgModule({
  declarations: [SearchControlDirective],
  exports: [SearchControlDirective],
})
export class SearchControlModule {}
