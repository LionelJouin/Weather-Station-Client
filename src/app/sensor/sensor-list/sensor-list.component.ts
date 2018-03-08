import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../shared/models/sensor';
import { SensorService } from '../shared/services/sensor.service';
import { MatDialog } from '@angular/material';
import { SensorDialogComponent } from '../sensor-dialog/sensor-dialog.component';
import { SensorRemoveDialogComponent } from '../sensor-remove-dialog/sensor-remove-dialog.component';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {

  sensors: Sensor[];

  constructor(
    private sensorService: SensorService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllSensors();
  }

  getAllSensors(): void {
    this.sensorService.getAll()
      .subscribe(sensors => this.sensors = sensors);
  }

  openSensorCreateDialog(sensor?: Sensor): void {
    let dialogRef = this.dialog.open(SensorDialogComponent, {
      width: '400px',
      data: { sensor }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllSensors();
    });
  }

  openSensorRemoveDialog(sensor?: Sensor): void {
    let dialogRef = this.dialog.open(SensorRemoveDialogComponent, {
      width: '400px',
      data: { sensor }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllSensors();
    });
  }

}
