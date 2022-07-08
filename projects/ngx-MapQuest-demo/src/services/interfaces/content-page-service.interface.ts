import {Observable} from 'rxjs';
import {ContentTitleViewModel} from '../../view-models/content-pages/content-title.view-model';
import {ContentSectionViewModel} from '../../view-models/content-pages/content-section.view-model';

export interface IContentPageService {

  //#region Methods

  // Get title of content page asynchronously.
  getTitleAsync(): Observable<ContentTitleViewModel>;

  // Get sections of content page asynchronously.
  getSectionsAsync(): Observable<ContentSectionViewModel[]>;

  //#endregion

}
