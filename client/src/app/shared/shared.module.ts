import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  exports: [
    BrowserModule,
    HttpClientModule,
  ],
})
export class SharedModule { }
