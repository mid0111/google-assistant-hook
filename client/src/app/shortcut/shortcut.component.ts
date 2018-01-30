import { Component, OnInit } from '@angular/core';
import { ExtensionService } from '../model/extension.service';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
  providers: [
    ExtensionService,
  ],
})
export class ShortcutComponent implements OnInit {
  title: String;
  description: String;
  shortcuts = [{
    name: 'おやすみなさい',
    words: ['おやすみなさい', 'おやすみ', 'いってきます'],
    functions: [{
      name: '電気',
      operation: 'OFF',
    }, {
      name: 'TV',
      operation: 'OFF',
    }, {
      name: 'オーディオ',
      operation: 'OFF',
    }, {
      name: 'エアコン',
      operation: 'OFF',
    }],
  }, {
    name: 'おはよう',
    words: ['おはよう', 'ただいま'],
    functions: [{
      name: '電気',
      operation: 'ON',
    }, {
      name: 'TV',
      operation: 'ON',
    }, {
      name: 'オーディオ',
      operation: 'ON',
    }, {
      name: 'エアコン',
      operation: '暖房 ON',
    }],
  }];

  constructor(
    private extensionService: ExtensionService,
  ) { }

  ngOnInit() {
    this.getExtension();
  }

  getExtension(): void {
    this.extensionService.getExtension('/shortcut')
      .subscribe((extension) => {
        this.title = extension.title;
        this.description = extension.description;
      });
  }
}
