import { Component, OnInit, Inject } from '@angular/core';
import { Station } from '../../shared/models/station';
import { StationService } from '../shared/services/station.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-station-remove-dialog',
  templateUrl: './station-remove-dialog.component.html',
  styleUrls: ['./station-remove-dialog.component.css']
})
export class StationRemoveDialogComponent implements OnInit {

  busy: boolean;
  stationName: string;
  stationNameFormControl = new FormControl('', []);

  constructor(
    private stationService: StationService,
    public dialogRef: MatDialogRef<StationRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    if (this.data == undefined || this.data.weatherStation == undefined)
      this.cancel();

    this.stationNameFormControl.setValidators([
      Validators.required,
      this.equals(this.data.weatherStation.name)
    ])
  }

  equals(stationName: string) {
    return (control: AbstractControl) => {
      if (control.value != stationName) { return { "equals": false }; }
      return null;
    }
  }

  submit() {
    if (this.data.weatherStation.name != this.stationName)
      return;

    this.busy = true;

    this.stationService.remove(this.data.weatherStation.id)
      .subscribe(
        station => {
          this.dialogRef.close();
          this.busy = false;
        });
  }

  cancel() {
    this.dialogRef.close();
  }

}
