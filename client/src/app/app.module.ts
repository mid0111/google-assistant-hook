import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MenusComponent } from './menu/menus.component';
import { ProfileService } from './model/profile.service';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    MenusComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
