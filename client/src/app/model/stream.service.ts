import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../app.settings';
import { Stream } from './stream';

@Injectable()
export class StreamService {

  constructor(private http: HttpClient) { }

  play(request: Stream): Observable<object> {
    return this.http.post(`${AppSettings.API_ENDPOINT}/stream`, request);
  }
}
