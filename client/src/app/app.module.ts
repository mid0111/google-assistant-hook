import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenusComponent } from './menu/menus.component';
import { NavComponent } from './nav/nav.component';
import { ExtensionsComponent } from './extension/extensions.component';


@NgModule({
  declarations: [
    AppComponent,
    MenusComponent,
    NavComponent,
    ExtensionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
