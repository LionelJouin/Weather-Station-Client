import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Station } from '../../shared/models/station';
import { Sensor } from '../../shared/models/sensor';
import { SensorService } from '../../sensor/shared/services/sensor.service';
import { StationService } from '../shared/services/station.service';

@Component({
  selector: 'app-station-dialog',
  templateUrl: './station-dialog.component.html',
  styleUrls: ['./station-dialog.component.css']
})
export class StationDialogComponent implements OnInit {

  weatherStation: Station;
  update: boolean;
  busy: boolean;
  sensors: Sensor[];

  constructor(
    private stationService: StationService,
    private sensorService: SensorService,
    public dialogRef: MatDialogRef<StationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.busy = false;
    this.update = false;

    if (this.data == undefined || this.data.weatherStation == undefined)
      this.weatherStation = new Station();
    else {
      this.update = true;
      this.weatherStation = Object.assign({}, this.data.weatherStation);
    }

    this.getAllSensors();
  }

  private getById(id: string): void {
    this.stationService.getById(id)
      .subscribe(
        station => {
          this.data.weatherStation.sensors = station.sensors;
          this.weatherStation.sensors = this.sensors.filter(x => station.sensors.find(y => y.id == x.id))
        }
      );
  }

  getAllSensors(): void {
    this.sensorService.getAll()
      .subscribe(
        sensors => {
          this.sensors = sensors;
          if (this.update)
            this.getById(this.data.weatherStation.id);
        });
  }

  submit() {
    if (this.weatherStation.name == undefined || this.weatherStation.name == "")
      return;
    this.busy = true;

    if (this.update)
      this.updateStation();
    else
      this.createStation();
  }

  private createStation() {
    this.stationService.create(this.weatherStation)
      .subscribe(
        station => {
          this.addRelationsStationSensor(station.id);
          this.dialogRef.close();
          this.busy = false;
        });
  }

  private addRelationsStationSensor(id: string) {
    for (var i = 0; i < this.weatherStation.sensors.length; i++) {
      this.stationService.addSensor(id, this.weatherStation.sensors[i].id)
        .subscribe(
          station => { }
        );
    }
  }

  private updateStation() {
    this.stationService.update(this.weatherStation)
      .subscribe(
        station => {
          this.updateRelationsStationSensor();
          this.dialogRef.close();
          this.busy = false;
        });
  }

  private updateRelationsStationSensor() {
    var toAdd = this.weatherStation.sensors.filter(x => !this.data.weatherStation.sensors.find(y => y.id == x.id));
    var toRemove = this.data.weatherStation.sensors.filter(x => !this.weatherStation.sensors.find(y => y.id == x.id));

    for (var i = 0; i < toAdd.length; i++) {
      this.stationService.addSensor(this.weatherStation.id, toAdd[i].id)
        .subscribe(
          station => { }
        );
    }

    for (var i = 0; i < toRemove.length; i++) {
      this.stationService.removeSensor(this.weatherStation.id, toRemove[i].id)
        .subscribe(
          station => { }
        );
    }

  }


  cancel() {
    this.dialogRef.close();
  }

}
