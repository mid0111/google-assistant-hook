import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Extension } from './extension';

@Injectable()
export class ExtensionService {

  constructor() { }

  getExtensions(): Observable<Extension[]> {
    return of([{
      title: 'Stream Music',
      description: 'Web 上の音楽を Google Home でストリーム再生する',
      path: '/stream',
      btnName: 'Stream Music',
    }]);
  }
}
