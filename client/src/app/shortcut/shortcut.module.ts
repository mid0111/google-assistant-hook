import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortcutListComponent } from './shortcut-list.component';
import { ShortcutComponent } from './shortcut/shortcut.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ShortcutListComponent,
    ShortcutComponent,
  ],
})
export class ShortcutModule { }
