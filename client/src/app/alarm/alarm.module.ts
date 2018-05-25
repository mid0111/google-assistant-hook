import { NgModule } from '@angular/core';
import { AlarmComponent } from './alarm.component';
import { SharedModule } from '../shared/shared.module';
import { AlarmFormComponent } from './alarm-form/alarm-form.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AlarmComponent,
    AlarmFormComponent,
  ],
})
export class AlarmModule { }
