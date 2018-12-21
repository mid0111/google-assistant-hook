
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { AppSettings } from '../app.settings';
import { Machine, Shortcut } from './shortcut';

export class ShortcutImpl implements Shortcut {
  id: number;
  name: String;
  words: String[];
  machines: Machine[];
  isEditMode: Boolean;

  constructor(id: number, name: String, words: String[], machines: Machine[]) {
    this.id = id;
    this.name = name;
    this.words = words;
    this.machines = machines;
    this.isEditMode = false;
  }

  getMachine(name: String): Machine {
    return this.machines.filter((machine) => machine.name === name)[0];
  }
}

@Injectable()
export class ShortcutService {

  constructor(private http: HttpClient) { }

  getShortcuts(): Observable<Shortcut[]> {
    return this.http.get<Object>(`${AppSettings.API_ENDPOINT}/shortcut`).pipe(
      map((res) => {
        const results: Shortcut[] = [];
        res['shortcuts'].forEach((shortcut) => {
          if (shortcut.name === 'off') {
            results.push(new ShortcutImpl(
              0,
              'おやすみなさい',
              ['おやすみなさい', 'おやすみ', 'いってきます'],
              [{
                id: 'light',
                name: '電気',
                operations: ['OFF', 'なし'],
                selectedOperation: shortcut.data.indexOf('light') >= 0 ? 'OFF' : 'なし',
              }, {
                id: 'tv',
                name: 'TV',
                operations: ['OFF', 'なし'],
                selectedOperation: shortcut.data.indexOf('tv') >= 0 ? 'OFF' : 'なし',
              }, {
                id: 'audio',
                name: 'オーディオ',
                operations: ['OFF', 'なし'],
                selectedOperation: shortcut.data.indexOf('audio') >= 0 ? 'OFF' : 'なし',
              }, {
                id: 'aircon',
                name: 'エアコン',
                operations: ['OFF', 'なし'],
                selectedOperation: shortcut.data.indexOf('aircon') >= 0 ? 'OFF' : 'なし',
              }],
            ));
          } else if (shortcut.name === 'on') {
            results.push(new ShortcutImpl(
              1,
              'おはよう',
              ['おはよう', 'ただいま'],
              [{
                id: 'light',
                name: '電気',
                operations: ['ON', 'なし'],
                selectedOperation: shortcut.data.indexOf('light') >= 0 ? 'ON' : 'なし',
              }, {
                id: 'tv',
                name: 'TV',
                operations: ['ON', 'なし'],
                selectedOperation: shortcut.data.indexOf('tv') >= 0 ? 'ON' : 'なし',
              }, {
                id: 'audio',
                name: 'オーディオ',
                operations: ['ON', 'なし'],
                selectedOperation: shortcut.data.indexOf('audio') >= 0 ? 'ON' : 'なし',
              }, {
                id: 'aircon',
                name: 'エアコン',
                operations: ['冷房 ON', '暖房 ON', 'なし'],
                selectedOperation: shortcut.data.indexOf('cold') >= 0 ? '冷房 ON' : shortcut.data.indexOf('heat') >= 0 ? '暖房 ON' : 'なし',
              }],
            ));
          }
        });
        return results.sort((a, b) => a.id - b.id);
      }));
  }

  updateShortcut(shortcut: Shortcut): Observable<void> {
    const data = [];

    if (shortcut.id === 0) {
      // おやすみ用ショートカット
      shortcut.machines.forEach((machine: Machine) => {
        if (machine.selectedOperation === 'OFF') {
          data.push(machine.id);
        }
      });
      return this.http.put<void>(`${AppSettings.API_ENDPOINT}/shortcut/off`, {
        data,
      });
    }

    // おはよう用ショートカット
    shortcut.machines.forEach((machine: Machine) => {
      if (machine.selectedOperation === 'ON') {
        data.push(machine.id);
      } else if (machine.selectedOperation === '暖房 ON') {
        data.push('heat');
      } else if (machine.selectedOperation === '冷房 ON') {
        data.push('cold');
      }
    });
    return this.http.put<void>(`${AppSettings.API_ENDPOINT}/shortcut/on`, {
      data,
    });
  }
}
