import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RebuildComponent } from './rebuild.component';
import { PodcastComponent } from './podcast/podcast.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    RebuildComponent,
    PodcastComponent,
  ],
})
export class RebuildModule { }
