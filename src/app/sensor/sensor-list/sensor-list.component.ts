import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../shared/models/sensor';
import { SensorService } from '../shared/services/sensor.service';
import { MatDialog } from '@angular/material';
import { SensorCreateDialogComponent } from '../sensor-create-dialog/sensor-create-dialog.component';

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

  openSensorCreateDialog(): void {
    let dialogRef = this.dialog.open(SensorCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllSensors();
    });
  }

}
