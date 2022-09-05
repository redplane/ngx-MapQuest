import {NgModule, ModuleWithProviders} from '@angular/core';
import {ProfileResolve} from './profile.resolve';

@NgModule({})

export class ResolveModule {

  //#region Methods

  static forRoot(): ModuleWithProviders<ResolveModule> {
    return {
      ngModule: ResolveModule,
      providers: [
        ProfileResolve
      ]
    };
  }

  //#endregion
}


