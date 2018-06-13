import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShortcutListComponent } from './shortcut/shortcut-list.component';
import { StreamComponent } from './stream/stream.component';
import { RebuildComponent } from './rebuild/rebuild.component';
import { AlarmComponent } from './alarm/alarm.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shortcut', component: ShortcutListComponent },
  { path: 'alarm', component: AlarmComponent },
  { path: 'stream', component: StreamComponent },
  { path: 'rebuild', component: RebuildComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule { }
