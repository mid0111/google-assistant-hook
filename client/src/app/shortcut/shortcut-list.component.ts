import { Component, OnInit } from '@angular/core';

import { ExtensionService } from '../model/extension.service';
import { Shortcut } from '../model/shortcut';
import { ShortcutService } from '../model/shortcut.service';

@Component({
  selector: 'app-shortcut-list',
  templateUrl: './shortcut-list.component.html',
  styleUrls: ['./shortcut-list.component.scss'],
  providers: [
    ExtensionService,
    ShortcutService,
  ],
})
export class ShortcutListComponent implements OnInit {
  title: String;
  description: String;
  shortcuts: Shortcut[];

  constructor(
    private extensionService: ExtensionService,
    private shortcutService: ShortcutService,
  ) { }

  ngOnInit() {
    this.getExtension();
    this.getShortcuts();
  }

  getExtension(): void {
    this.extensionService.getExtension('/shortcut')
      .subscribe((extension) => {
        this.title = extension.title;
        this.description = extension.description;
      });
  }

  getShortcuts(): void {
    this.shortcutService.getShortcuts()
      .subscribe((shortcuts) => this.shortcuts = shortcuts);
  }
}
