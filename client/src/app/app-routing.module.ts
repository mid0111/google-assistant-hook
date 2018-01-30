import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShortcutComponent } from './shortcut/shortcut.component';
import { StreamComponent } from './stream/stream.component';
import { RebuildComponent } from './rebuild/rebuild.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shortcut', component: ShortcutComponent },
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
