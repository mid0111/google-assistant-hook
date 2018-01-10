import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MenusComponent } from '../menu/menus.component';
import { ExtensionsComponent } from '../extension/extensions.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenusComponent,
    ExtensionsComponent,
  ],
  imports: [
    BrowserModule,
  ],
})
export class HomeModule { }
