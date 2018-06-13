import { NgModule } from '@angular/core';

import { MessageService } from './model/message.service';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ShortcutModule } from './shortcut/shortcut.module';
import { StreamModule } from './stream/stream.module';
import { RebuildModule } from './rebuild/rebuild.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './message/message.component';
import { AlarmModule } from './alarm/alarm.module';

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
    SharedModule,
    AppRoutingModule,
    HomeModule,
    AlarmModule,
    ShortcutModule,
    StreamModule,
    RebuildModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
