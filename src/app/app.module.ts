import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StationListComponent } from './station/station-list/station-list.component';
import { StationDataComponent } from './station/station-data/station-data.component';
import { StationService } from './station/shared/services/station.service';
import { ApiService } from './shared/services/api.service';
import { WeatherDataService } from './station/shared/services/weather-data.service';


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
    StationService,
    WeatherDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
