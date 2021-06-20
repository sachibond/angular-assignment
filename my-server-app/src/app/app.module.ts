import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
