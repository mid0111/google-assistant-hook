import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { StreamComponent } from './stream.component';
import { StreamFormComponent } from './stream-form/stream-form.component';

@NgModule({
  declarations: [
    StreamComponent,
    StreamFormComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
  ],
})
export class StreamModule { }
