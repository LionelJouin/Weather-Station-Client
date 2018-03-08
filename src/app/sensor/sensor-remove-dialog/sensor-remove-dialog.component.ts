import { Component, OnInit, Inject } from '@angular/core';
import { Station } from '../../shared/models/station';
import { SensorService } from '../shared/services/sensor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-sensor-remove-dialog',
  templateUrl: './sensor-remove-dialog.component.html',
  styleUrls: ['./sensor-remove-dialog.component.css']
})
export class SensorRemoveDialogComponent implements OnInit {

  busy: boolean;
  sensorName: string;
  sensorNameFormControl = new FormControl('', []);

  constructor(
    private sensorService: SensorService,
    public dialogRef: MatDialogRef<SensorRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data == undefined || this.data.sensor == undefined)
      this.cancel();

    this.sensorNameFormControl.setValidators([
      Validators.required,
      this.equals(this.data.sensor.name)
    ])
  }

  equals(sensorName: string) {
    return (control: AbstractControl) => {
      if (control.value != sensorName) { return { "equals": false }; }
      return null;
    }
  }

  submit() {
    if (this.data.sensor.name != this.sensorName)
      return;

    this.busy = true;

    this.sensorService.remove(this.data.sensor.id)
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
