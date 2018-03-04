import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Station } from '../../shared/models/station';
import { Sensor } from '../../shared/models/sensor';
import { SensorService } from '../../sensor/shared/services/sensor.service';
import { StationService } from '../shared/services/station.service';


@Component({
  selector: 'app-station-create-dialog',
  templateUrl: './station-create-dialog.component.html',
  styleUrls: ['./station-create-dialog.component.css']
})
export class StationCreateDialogComponent implements OnInit {

  sensors: Sensor[];

  constructor(
    private stationService: StationService,
    private sensorService: SensorService,
    public dialogRef: MatDialogRef<StationCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public weatherStation: Station
  ) {
  }

  ngOnInit() {
    if (this.weatherStation == undefined)
      this.weatherStation = new Station();

    this.getAllSensors();
  }

  getAllSensors(): void {
    this.sensorService.getAll()
      .subscribe(sensors => this.sensors = sensors);
  }

  submit() {
    if (this.weatherStation.name == undefined || this.weatherStation.name == "")
      return;
    this.stationService.create(this.weatherStation)
      .subscribe(
        station => this.addRelationsStationSensor(station.id) && this.dialogRef.close()
      );
  }

  addRelationsStationSensor(id: string) {
    for (var i = 0; i < this.weatherStation.sensors.length; i++) {
      this.stationService.addSensor(id, this.weatherStation.sensors[i].id)
        .subscribe(
          station => this.dialogRef.close()
        );
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
