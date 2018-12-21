
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';


import { Extension } from './extension';

@Injectable()
export class ExtensionService {

  constructor() { }

  getExtensions(): Observable<Extension[]> {
    return of([{
      title: 'ショートカット',
      description: '音声コマンドのショートカット機能を利用する',
      path: '/shortcut',
      btnName: 'Shortcut',
      materialIcon: 'speaker_notes',
    }, {
      title: 'アラーム',
      description: 'アラームの設定をする',
      path: '/alarm',
      btnName: 'Alarm',
      materialIcon: 'alarm',
    }, {
      title: 'Rebuild FM ポッドキャスト',
      description: 'Rebuild FM のエピソードを Google Home で再生',
      path: '/rebuild',
      btnName: 'Rebuild FM',
      backgroundImage: 'https://rebuild.fm/images/bg.jpg',
    }, {
      title: 'Stream Music',
      description: 'Web 上の音楽を Google Home でストリーム再生',
      path: '/stream',
      btnName: 'Stream Music',
      materialIcon: 'queue_music',
    }]);
  }

  getExtension(path: String): Observable<Extension> {
    return this.getExtensions().pipe(
      map((extensions) => {
        return extensions.filter((extension) => extension.path === path)[0];
      }));
  }
}
