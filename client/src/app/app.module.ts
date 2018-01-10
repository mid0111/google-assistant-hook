import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { StreamExtensionComponent } from './extension/stream-extension.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StreamExtensionComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
