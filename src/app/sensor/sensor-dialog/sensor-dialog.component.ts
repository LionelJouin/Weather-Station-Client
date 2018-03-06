import { Component, OnInit, Inject } from '@angular/core';
import { Sensor } from '../../shared/models/sensor';
import { SensorService } from '../shared/services/sensor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sensor-dialog',
  templateUrl: './sensor-dialog.component.html',
  styleUrls: ['./sensor-dialog.component.css']
})
export class SensorDialogComponent implements OnInit {

  sensor: Sensor;
  update: boolean;
  busy: boolean;

  constructor(
    private sensorService: SensorService,
    public dialogRef: MatDialogRef<SensorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.busy = false;
    this.update = false;

    if (this.data == undefined || this.data.sensor == undefined)
      this.sensor = new Sensor();
    else {
      this.update = true;
      this.sensor = Object.assign({}, this.data.sensor);
    }
  }

  submit() {
    if (this.sensor.name == undefined || this.sensor.name == "" || this.sensor.unit == undefined || this.sensor.unit == "")
      return;
    this.busy = true;

    if (this.update)
      this.updateSensor();
    else
      this.createSensor();
  }

  private updateSensor() {
    this.sensorService.update(this.sensor)
      .subscribe(
        sensor => {
          this.dialogRef.close();
          this.busy = false;
        });
  }

  private createSensor() {
    this.sensorService.create(this.sensor)
      .subscribe(
        sensor => {
          this.dialogRef.close();
          this.busy = false;
        });
  }

  cancel() {
    this.dialogRef.close();
  }

}
