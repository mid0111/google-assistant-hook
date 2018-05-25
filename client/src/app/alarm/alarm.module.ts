import { NgModule } from '@angular/core';
import { AlarmComponent } from './alarm.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AlarmComponent,
  ],
})
export class AlarmModule { }
