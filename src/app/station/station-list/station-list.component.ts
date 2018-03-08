import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StationService } from '../shared/services/station.service';
import { Station } from '../../shared/models/station';
import { StationDialogComponent } from '../station-dialog/station-dialog.component';
import { StationRemoveDialogComponent } from '../station-remove-dialog/station-remove-dialog.component';


@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {

  stations: Station[];

  constructor(
    private stationService: StationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllStations();
  }

  getAllStations(): void {
    this.stationService.getAll()
      .subscribe(stations => this.stations = stations);
  }

  openStationCreateDialog(weatherStation?: Station): void {
    let dialogRef = this.dialog.open(StationDialogComponent, {
      width: '400px',
      data: { weatherStation }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllStations();
    });
  }

  openStationRemoveDialog(weatherStation?: Station): void {
    let dialogRef = this.dialog.open(StationRemoveDialogComponent, {
      width: '400px',
      data: { weatherStation }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllStations();
    });
  }

}
