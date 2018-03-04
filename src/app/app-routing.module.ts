import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StationListComponent } from './station/station-list/station-list.component';
import { StationDataComponent } from './station/station-data/station-data.component';
import { SensorListComponent } from './sensor/sensor-list/sensor-list.component';

const routes: Routes = [
  {path : '', component: StationListComponent},
  {path : 'station/:id', component: StationDataComponent},
  {path : 'sensors', component: SensorListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
