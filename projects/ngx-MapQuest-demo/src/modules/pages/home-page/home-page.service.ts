import {IContentPageService} from '../../../services/interfaces/content-page-service.interface';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ContentTitleViewModel} from '../../../view-models/content-pages/content-title.view-model';
import {ContentSectionViewModel} from '../../../view-models/content-pages/content-section.view-model';

@Injectable()
export class HomePageService implements IContentPageService {

  //#region Methods

  public getTitleAsync(): Observable<ContentTitleViewModel> {
    return of(new ContentTitleViewModel('ngx-MapQuest'));
  }

  public getSectionsAsync(): Observable<ContentSectionViewModel[]> {
    const sections: ContentSectionViewModel[] = [];
    sections.push(new ContentSectionViewModel('Overview', 'This is overview'));
    sections.push(new ContentSectionViewModel('Installation', 'How to install'));
    sections.push(new ContentSectionViewModel('How to contribute', 'How to contribute'));

    return of(sections);
  }

  //#endregion

}
