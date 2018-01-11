import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MessageService } from './model/message.service';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { StreamModule } from './stream/stream.module';
import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MessageComponent,
  ],
  providers: [
    MessageService,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    StreamModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
