import {IUiService} from '../interfaces/ui-service.interface';
import {Injectable} from '@angular/core';

import * as $ from 'jquery';

@Injectable()
export class UiService implements IUiService {

  /*
  * Toggle side-bar
  * */
  public toggleSideBar(): void {
    $('#sidebarToggle, #sidebarToggleTop').on('click', (e) => {
      $('body').toggleClass('sidebar-toggled');
      $('.sidebar').toggleClass('toggled');
      // if ($('.sidebar').hasClass('toggled')) {
      //   $('.sidebar .collapse').collapse('hide');
      // }
    });

  }

}
