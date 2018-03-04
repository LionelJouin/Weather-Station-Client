import { Component, OnInit, Inject } from '@angular/core';
import { Sensor } from '../../shared/models/sensor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SensorService } from '../shared/services/sensor.service';

@Component({
  selector: 'app-sensor-create-dialog',
  templateUrl: './sensor-create-dialog.component.html',
  styleUrls: ['./sensor-create-dialog.component.css']
})
export class SensorCreateDialogComponent implements OnInit {

  constructor(
    private sensorService: SensorService,
    public dialogRef: MatDialogRef<SensorCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sensor: Sensor
  ) { }

  ngOnInit() {
    if (this.sensor == undefined)
      this.sensor = new Sensor();
  }

  submit() {
    if (this.sensor.name == undefined || this.sensor.name == "" || this.sensor.unit == undefined || this.sensor.unit == "")
      return;
    this.sensorService.create(this.sensor)
      .subscribe(
        station => this.dialogRef.close()
      );
  }

  cancel() {
    this.dialogRef.close();
  }

}
