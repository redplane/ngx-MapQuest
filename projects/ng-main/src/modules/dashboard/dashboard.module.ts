import {DashboardComponent} from "./dashboard.component";
import {NgModule} from "@angular/core";
import {DashboardRouteModule} from "./dashboard.route";

//#region Routes declaration


//#endregion

//#region Module declaration

@NgModule({
  imports: [
    DashboardRouteModule
  ]
})

export class DashboardModule {
}

//#endregion
