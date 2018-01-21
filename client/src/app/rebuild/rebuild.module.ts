import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RebuildComponent } from './rebuild.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    RebuildComponent,
  ],
})
export class RebuildModule { }
