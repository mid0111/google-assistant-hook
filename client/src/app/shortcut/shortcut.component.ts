import { Component, OnInit } from '@angular/core';

import { ExtensionService } from '../model/extension.service';
import { Shortcut, Machine } from '../model/shortcut';
import { ShortcutService } from '../model/shortcut.service';
import { MessageService } from '../model/message.service';
import { MessageType } from '../model/message';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
  providers: [
    ExtensionService,
    ShortcutService,
  ],
})
export class ShortcutComponent implements OnInit {
  title: String;
  description: String;
  shortcuts: Shortcut[];

  constructor(
    private extensionService: ExtensionService,
    private shortcutService: ShortcutService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getExtension();
    this.getShortcuts();
  }

  onEdit(shortcut: Shortcut): void {
    shortcut.isEditMode = true;
  }

  onSave(shortcut: Shortcut): void {
    this.shortcutService.updateShortcut(shortcut)
      .subscribe(
      () => {
        shortcut.isEditMode = false;
      },
      (error) => {
        this.messageService.set({
          message: 'ショートカットの更新に失敗しました。',
          type: MessageType.ERROR,
          error,
        });
      });
  }

  checked(shortcut: Shortcut, selectedMachine: Machine, operationIndex: number): Boolean {
    const machine = shortcut.machines.filter((value) => value.name === selectedMachine.name)[0];
    return shortcut.getMachine(selectedMachine.name).selectedOperation === machine.operations[operationIndex];
  }

  onSelectionChange(shortcut: Shortcut, selectedMachine: Machine, operationIndex: number): void {
    const machine = shortcut.machines.filter((value) => value.name === selectedMachine.name)[0];
    shortcut.getMachine(selectedMachine.name).selectedOperation = machine.operations[operationIndex];
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
