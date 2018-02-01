import { Component, OnInit, Input } from '@angular/core';

import { Shortcut, Machine } from '../../model/shortcut';
import { ShortcutService } from '../../model/shortcut.service';
import { MessageService } from '../../model/message.service';
import { MessageType } from '../../model/message';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
  providers: [
    ShortcutService,
  ],
})
export class ShortcutComponent implements OnInit {
  @Input() shortcut: Shortcut;

  constructor(
    private shortcutService: ShortcutService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  onEdit(): void {
    this.shortcut.isEditMode = true;
  }

  onSave(): void {
    this.shortcutService.updateShortcut(this.shortcut)
      .subscribe(
      () => {
        this.shortcut.isEditMode = false;
      },
      (error) => {
        this.messageService.set({
          message: 'ショートカットの更新に失敗しました。',
          type: MessageType.ERROR,
          error,
        });
      });
  }

  checked(selectedMachine: Machine, operationIndex: number): Boolean {
    const machine = this.shortcut.machines.filter((value) => value.name === selectedMachine.name)[0];
    return this.shortcut.getMachine(selectedMachine.name).selectedOperation === machine.operations[operationIndex];
  }

  onSelectionChange(selectedMachine: Machine, operationIndex: number): void {
    const machine = this.shortcut.machines.filter((value) => value.name === selectedMachine.name)[0];
    this.shortcut.getMachine(selectedMachine.name).selectedOperation = machine.operations[operationIndex];
  }

}
