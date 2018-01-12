import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  exports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class SharedModule { }
