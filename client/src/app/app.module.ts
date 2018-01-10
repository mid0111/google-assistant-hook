import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MenusComponent } from './menus/menus.component';
import { ProfileService } from './models/profile.service';
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
