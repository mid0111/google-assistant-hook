import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { StreamModule } from './stream/stream.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    StreamModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
