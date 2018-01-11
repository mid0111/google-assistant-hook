import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StreamComponent } from './stream.component';
import { StreamFormComponent } from './stream-form/stream-form.component';

@NgModule({
  declarations: [
    StreamComponent,
    StreamFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
})
export class StreamModule { }
