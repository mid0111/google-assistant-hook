import { NgModule } from '@angular/core';
import { AlarmComponent } from './alarm.component';
import { SharedModule } from '../shared/shared.module';
import { AlarmFormComponent } from './alarm-form/alarm-form.component';
import { AlarmListComponent } from '../alarm-list/alarm-list.component';
import { AlarmService } from '../model/alarm.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AlarmComponent,
    AlarmFormComponent,
    AlarmListComponent,
  ],
  providers: [
    AlarmService,
  ],
})
export class AlarmModule { }
