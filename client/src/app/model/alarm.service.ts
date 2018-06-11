import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { AppSettings } from '../app.settings';
import { Alarm } from './alarm';

@Injectable()
export class AlarmService {
  private alarmsSource: Subject<Alarm[]> = new Subject<Alarm[]>();
  public alarms$: Observable<Alarm[]> = this.alarmsSource.asObservable();

  constructor(private http: HttpClient) { }

  list(): Observable<Alarm[]> {
    return this.http.get<Object>(`${AppSettings.API_ENDPOINT}/alarm`)
      .map((res) => {
        return res['alarms'].map((alarm) => {
          return {
            time: alarm.time,
            message: alarm.message,
          } as Alarm;
        });
      })
      .map((alarms) => {
        this.alarmsSource.next(alarms);
        return alarms;
      });
  }

  add(alarm: Alarm): Observable<Alarm[]> {
    return this.http.post<Alarm>(`${AppSettings.API_ENDPOINT}/alarm`, alarm)
      .mergeMap(() => this.list());
  }

}
