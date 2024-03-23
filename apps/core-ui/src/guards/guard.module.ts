import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule()
export class GuardModule {
  static forRoot(): ModuleWithProviders<GuardModule> {
    return {
      ngModule: GuardModule,
    };
  }
}
