import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    SpinnerComponent,
  ],
  exports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SpinnerComponent,
  ],
})
export class SharedModule { }
