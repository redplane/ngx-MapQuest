import {Inject, Injectable} from '@angular/core';
import {MqCssFile, MqScriptFile, MqSystemFile} from 'ngx-MapQuest';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {delay, map, mergeMap, retryWhen, tap} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class MqFileLoaderService {

  //#region Constructor

  public constructor(@Inject(DOCUMENT) protected readonly document: Document) {
  }

  //#endregion

  //#region Methods

  public loadSystemFilesAsync(systemFiles: MqSystemFile[]): Observable<void> {
    const loadSystemFilesObservables: Observable<void>[] = [];

    for (const mqSystemFile of systemFiles) {

      // Element to be managed.
      let htmlElement: HTMLElement = null;
      let htmlElementBuilder: () => HTMLElement = null;

      switch (mqSystemFile.kind) {
        case 'script':
          const mqScriptFile = mqSystemFile as MqScriptFile;
          htmlElement = this.document.querySelector(`script[src=${CSS.escape(mqScriptFile.src)}]`);
          htmlElementBuilder = () => {
            const scriptTag = this.document.createElement('script');
            scriptTag.src = mqScriptFile.src;
            return scriptTag;
          };
          break;

        case 'css':
          const mqCssFile = mqSystemFile as MqCssFile;
          htmlElement = this.document.querySelector(`link[href=${CSS.escape(mqCssFile.href)}]`);
          htmlElementBuilder = () => {
            const linkTag = this.document.createElement('link');
            linkTag.href = mqCssFile.href;
            linkTag.type = 'text/css';
            linkTag.rel = 'stylesheet';

            return linkTag;
          };
      }

      const szDataLoadStatus = 'data-load-status';

      if (htmlElement) {
        const loadStatus = htmlElement.getAttribute(szDataLoadStatus);

        // Tag has been done loaded.
        if (loadStatus === 'done') {
          loadSystemFilesObservables.push(of(void (0)));

        }
      } else {

        if (!htmlElementBuilder) {
          loadSystemFilesObservables.push(throwError('No suitable handler found'));
          continue;
        }
        htmlElement = htmlElementBuilder();
        htmlElement.onload = () => {
          htmlElement.setAttribute(szDataLoadStatus, 'done');
        };
        htmlElement.onerror = exception => {
          htmlElement.setAttribute(szDataLoadStatus, 'failed');
        };
        this.document.head.appendChild(htmlElement);
      }


      const loadHtmlElementObservable = of(void (0))
        .pipe(
          delay(100),
          mergeMap(() => {

            if (!htmlElement.hasAttribute(szDataLoadStatus)) {
              return throwError('NOT_YET_LOADED');
            }

            if (htmlElement.getAttribute(szDataLoadStatus) !== 'done') {
              return throwError('FAILED_TO_LOAD_MAP_QUEST_SYSTEM_FILE');
            }

            return of(void (0));
          }),
          retryWhen(exceptionObservable => {
            return exceptionObservable.pipe(
              tap(exception => {
                if (exception !== 'NOT_YET_LOADED') {
                  throw new Error(exception);
                }
              })
            );
          })
        );
      loadSystemFilesObservables.push(loadHtmlElementObservable);
    }

    if (!loadSystemFilesObservables?.length) {
      return of(void (0));
    }

    return forkJoin(loadSystemFilesObservables)
      .pipe(
        map(() => void (0))
      );
  }

  //#endregion
}
