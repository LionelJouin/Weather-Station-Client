import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StationListComponent } from './station/station-list/station-list.component';
import { StationDataComponent } from './station/station-data/station-data.component';
import { StationService } from './station/shared/services/station.service';
import { ApiService } from './shared/services/api.service';
import { WeatherDataService } from './station/shared/services/weather-data.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { StationCreateDialogComponent } from './station/station-create-dialog/station-create-dialog.component';
import { FormsModule } from '@angular/forms';
import { SensorService } from './sensor/shared/services/sensor.service';
import { SensorListComponent } from './sensor/sensor-list/sensor-list.component';
import { SensorCreateDialogComponent } from './sensor/sensor-create-dialog/sensor-create-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StationListComponent,
    StationDataComponent,
    HeaderComponent,
    StationCreateDialogComponent,
    SensorListComponent,
    SensorCreateDialogComponent
  ],
  entryComponents: [
    StationCreateDialogComponent,
    SensorCreateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [
    ApiService,
    StationService,
    WeatherDataService,
    SensorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
