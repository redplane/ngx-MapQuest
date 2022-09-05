import {Component, HostBinding} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'footer[footer-bar]',
  templateUrl: 'footer-bar.component.html'
})

export class FooterBarComponent {

  //#region Properties

  /*
  * Class which will be applied to the component.
  * */
  @HostBinding('class')
  public hostClass = 'sticky-footer bg-white';

  //#endregion

  //#region Constructor

  // Initiate instance with IoC.
  public constructor() {
  }

  //#endregion
}
