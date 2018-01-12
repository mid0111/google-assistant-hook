import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { MenusComponent } from './menus/menus.component';
import { ExtensionsComponent } from './extensions/extensions.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenusComponent,
    ExtensionsComponent,
  ],
  imports: [
    SharedModule,
  ],
})
export class HomeModule { }
