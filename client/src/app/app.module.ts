import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MenusComponent } from './menus/menus.component';
import { ProfileService } from './profile.service';


@NgModule({
  declarations: [
    AppComponent,
    MenusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
