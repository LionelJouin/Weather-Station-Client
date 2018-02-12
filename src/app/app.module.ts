import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StationListComponent } from './station/station-list/station-list.component';
import { StationDataComponent } from './station/station-data/station-data.component';
import { StationService } from './station/shared/services/station.service';
import { ApiService } from './shared/services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    StationListComponent,
    StationDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    StationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
