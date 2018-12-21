
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { AppSettings } from '../app.settings';
import { Rebuild } from './rebuild';
import { Podcast } from './podcast';

@Injectable()
export class RebuildService {

  constructor(private http: HttpClient) { }

  get(): Observable<Rebuild> {
    return this.http.get<Object>(`${AppSettings.API_ENDPOINT}/rebuild`).pipe(
      map((rebuild) => {
        const podcasts = rebuild['podcasts'].map((podcast) => {
          const pubDate = new Date(podcast.pubDate);
          return {
            title: podcast.title,
            subTitle: podcast.subTitle,
            date: pubDate.toLocaleString('en-us', { month: 'short', day: '2-digit' }),
            year: pubDate.getFullYear().toString(),
            url: podcast.url,
          } as Podcast;
        });
        return { podcasts };
      }));
  }
}
